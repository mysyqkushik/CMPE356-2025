import React, { useState } from "react";
import axios from "axios";

const UserLibraryCard = () => {
  const [message, setMessage] = useState("");
  const [fromUserId, setFromUserId] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!message.trim() || !fromUserId.trim()) {
      setError("Please enter both your User ID and a message.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        fromUserId: parseInt(fromUserId),
        toUserId: 1, // Admin ID fixed
        message: message.trim(),
      };

      await axios.post("http://localhost:8080/api/messages/send", payload);

      setConfirmation("✅ Message sent to Admin successfully!");
      setMessage("");
      setFromUserId("");

      setTimeout(() => setConfirmation(""), 3000);
    } catch (err) {
      console.error("Failed to send message:", err);
      setError(err.response?.data?.error || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4 text-brown-700">Message Admin</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your User ID
        </label>
        <input
          type="number"
          className="w-full p-2 border rounded shadow-sm focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter your user ID..."
          value={fromUserId}
          onChange={(e) => setFromUserId(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message to Admin (ID: 1)
        </label>
        <textarea
          className="w-full p-3 border rounded shadow-sm focus:ring-orange-500 focus:border-orange-500"
          placeholder="Type your message..."
          rows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />
      </div>

      <button
        onClick={handleSend}
        disabled={loading}
        className={`w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {confirmation && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded text-center">
          {confirmation}
        </div>
      )}
    </div>
  );
};

export default UserLibraryCard;
