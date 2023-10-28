function AudioDetail({ songId }: { songId: string }) {
  const handleClick = (songId: string) => {
    window.location.href = `/audio/${songId}/display`;
  };

  return (
    <div className="halloween-container">
      <div className="halloween-header">
        <h2>Halloween Receiptify</h2>
      </div>
      <div className="receipt-details">
        <div className="receipt-info">
          <p>Date: October 31, 2023</p>
          <p>Receipt #: 789012</p>
        </div>
        <div className="customer-info">
          <p>Customer: Jack Skeleton</p>
          <p>Email: jack@example.com</p>
        </div>
      </div>
      <table className="item-list">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pumpkin Spice Latte</td>
            <td>$5.00</td>
            <td>2</td>
            <td>$10.00</td>
          </tr>
          <tr>
            <td>Witch's Broomstick</td>
            <td>$15.00</td>
            <td>1</td>
            <td>$15.00</td>
          </tr>
        </tbody>
      </table>
      <div className="total">
        <p>Total: $25.00</p>
      </div>
      <button onClick={() => handleClick(songId)} className="halloween-button">
        View animate !!
      </button>
    </div>
  );
}

export default AudioDetail;
