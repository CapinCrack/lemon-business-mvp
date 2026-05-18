const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_ADDRESS = process.env.EMAIL_FROM ?? 'Lemon Miami <noreply@lemonmiami.com>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@lemonmiami.com';

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail(payload: EmailPayload) {
  if (!RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY not set — skipping email send.');
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_ADDRESS, ...payload }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('[email] Send failed:', text);
  }
}

export async function notifyAdminOfNewClaim(claim: {
  owner_full_name: string;
  owner_email: string;
  owner_phone?: string | null;
  custom_business_name?: string | null;
  business_id?: string | null;
  status: string;
  id: string;
}) {
  const businessLabel = claim.custom_business_name
    ? claim.custom_business_name
    : claim.business_id
    ? `Business ID ${claim.business_id}`
    : 'Unknown business';

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `New claim request from ${claim.owner_full_name}`,
    html: `
      <h2>New Business Claim — Lemon Miami</h2>
      <p><strong>Claimant:</strong> ${claim.owner_full_name} (${claim.owner_email})</p>
      ${claim.owner_phone ? `<p><strong>Phone:</strong> ${claim.owner_phone}</p>` : ''}
      <p><strong>Business:</strong> ${businessLabel}</p>
      <p><strong>Claim ID:</strong> ${claim.id}</p>
      <p>Review this claim in the <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin">Lemon Admin Dashboard</a>.</p>
    `,
  });
}

export async function notifyClaimantOfDecision(
  to: string,
  claimantName: string,
  action: 'approved' | 'rejected'
) {
  const subject =
    action === 'approved'
      ? 'Your Lemon business claim was approved!'
      : 'Update on your Lemon business claim';

  const html =
    action === 'approved'
      ? `
        <h2>You're in, ${claimantName}!</h2>
        <p>Your claim has been <strong>approved</strong>. You can now log in to manage your business listing on Lemon Miami.</p>
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard">Go to your dashboard</a></p>
      `
      : `
        <h2>Hi ${claimantName},</h2>
        <p>After reviewing your submission, we were unable to verify ownership of this business at this time.</p>
        <p>If you believe this is a mistake, reply to this email and we'll take another look.</p>
      `;

  await sendEmail({ to, subject, html });
}
