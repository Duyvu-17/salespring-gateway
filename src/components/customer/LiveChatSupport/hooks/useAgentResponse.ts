export const useAgentResponse = () => {
  const getAgentResponse = (userContent: string, messageType: string): string => {
    const lowerCaseMsg = userContent.toLowerCase();

    // Handle long messages
    if (userContent.length > 500) {
      return "Cảm ơn bạn đã chia sẻ thông tin chi tiết. Đội ngũ hỗ trợ của chúng tôi đang xem xét và sẽ phản hồi sớm nhất có thể.";
    }

    if (messageType === "image") {
      return "Cảm ơn bạn đã chia sẻ hình ảnh này. Đội ngũ hỗ trợ của chúng tôi sẽ xem xét và phản hồi sớm.";
    }

    // Existing response logic
    if (lowerCaseMsg.includes("đổi hàng") || lowerCaseMsg.includes("hoàn tiền") || 
        lowerCaseMsg.includes("return") || lowerCaseMsg.includes("refund")) {
      return "Để đổi hàng hoặc hoàn tiền, vui lòng truy cập phần Chính sách đổi trả của chúng tôi. Bạn có muốn tôi hướng dẫn bạn đến đó không?";
    }
    
    if (lowerCaseMsg.includes("sản phẩm") || lowerCaseMsg.includes("mặt hàng") || 
        lowerCaseMsg.includes("product")) {
      return "Đây là sản phẩm tai nghe bán chạy nhất của chúng tôi. Bạn có cần thêm thông tin gì không?";
    }
    
    if (lowerCaseMsg.includes("vận chuyển") || lowerCaseMsg.includes("giao hàng") || 
        lowerCaseMsg.includes("shipping") || lowerCaseMsg.includes("delivery")) {
      return "Đơn hàng của bạn thường được xử lý trong vòng 1-2 ngày làm việc. Vận chuyển tiêu chuẩn mất 3-5 ngày, trong khi vận chuyển nhanh mất 1-2 ngày.";
    }
    
    if (lowerCaseMsg.includes("kích thước") || lowerCaseMsg.includes("size")) {
      return "Hướng dẫn về kích thước có sẵn trên trang của từng sản phẩm. Bạn có muốn tôi giúp bạn tìm kích thước phù hợp cho một sản phẩm cụ thể không?";
    }
    
    if (lowerCaseMsg.includes("thanh toán") || lowerCaseMsg.includes("trả tiền") || 
        lowerCaseMsg.includes("payment")) {
      return "Chúng tôi chấp nhận thẻ tín dụng, PayPal và ví điện tử. Bạn quan tâm đến phương thức thanh toán nào?";
    }

    return "Cảm ơn tin nhắn của bạn. Đại diện dịch vụ khách hàng của chúng tôi sẽ phản hồi sớm. Còn gì khác tôi có thể giúp bạn không?";
  };

  return { getAgentResponse };
};
