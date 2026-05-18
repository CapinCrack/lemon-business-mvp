'use client'

export default function TestClaims() {
  async function runTest() {
    const res = await fetch('/api/claims', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        businessId: 'test-business-id',
        ownerFullName: 'Test Owner',
        ownerEmail: 'test@test.com',
        ownerPhone: '1234567890',
        customBusinessName: null,
        customBusinessCategory: null,
        additionalNotes: 'Testing flow',
      }),
    })

    const data = await res.json()
    console.log(data)
  }

  return (
    <div className="p-10">
      <button
        onClick={runTest}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Test Claim API
      </button>
    </div>
  )
}