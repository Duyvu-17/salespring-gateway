import React, { useState } from "react";
import {
  Star,
  MessageCircle,
  Image as ImageIcon,
  Send,
  Reply,
  ThumbsUp,
  User,
  Upload,
  X,
} from "lucide-react";
import { UserReview, Reply as ReplyType } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import ReviewItem from "./ReviewItem";

interface ReviewSectionProps {
  productId: number;
  reviews: UserReview[];
  onAddReview: (review: Omit<UserReview, "id">) => void;
  onAddReply: (reviewId: number, reply: Omit<ReplyType, "id">) => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  productId,
  reviews,
  onAddReview,
  onAddReply,
}) => {
  const [newReview, setNewReview] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [newReply, setNewReply] = useState("");
  const [rating, setRating] = useState(5);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 3) {
      toast({
        title: "Quá nhiều ảnh",
        description: "Bạn chỉ có thể tải lên tối đa 3 ảnh cho mỗi đánh giá",
        variant: "destructive",
      });
      return;
    }

    setImages(files);

    // Create preview URLs
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls(newImageUrls);
  };

  const removeImage = (indexToRemove: number) => {
    const newImages = images.filter((_, index) => index !== indexToRemove);
    const newImageUrls = imagePreviewUrls.filter(
      (_, index) => index !== indexToRemove
    );

    // Revoke the URL to free memory
    URL.revokeObjectURL(imagePreviewUrls[indexToRemove]);

    setImages(newImages);
    setImagePreviewUrls(newImageUrls);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    // In a real app, we would upload the images first and get URLs
    // For this demo, we'll just use the preview URLs
    onAddReview({
      review_id: Date.now(),
      userId: "current-user",
      userName: "Người dùng hiện tại",
      userAvatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80",
      rating,
      comment: newReview,
      date: new Date().toISOString().split("T")[0],
      images: imagePreviewUrls,
      replies: [],
    });

    // Reset form
    setNewReview("");
    setRating(5);
    setImages([]);
    setImagePreviewUrls([]);

    toast({
      title: "Đánh giá đã được thêm",
      description: "Đánh giá của bạn đã được thêm thành công!",
    });
  };

  const handleSubmitReply = (reviewId: number) => {
    if (!newReply.trim()) return;

    onAddReply(reviewId, {
      userId: "current-user",
      userName: "Current User",
      userAvatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80",
      comment: newReply,
      date: new Date().toISOString().split("T")[0],
    });

    setNewReply("");
    setReplyingTo(null);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Đánh giá của khách hàng</h2>

      {/* Add Review Form */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Viết đánh giá</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <Label htmlFor="rating">Đánh giá</Label>
              <div className="flex items-center space-x-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="comment">Đánh giá của bạn</Label>
              <Textarea
                id="comment"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Chia sẻ suy nghĩ của bạn về sản phẩm này..."
                className="mt-1 resize-none"
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="images">Thêm ảnh (tùy chọn)</Label>
              <div className="mt-2 space-y-4">
                {/* Custom Upload Button */}
                <div className="relative">
                  <input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Upload className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Nhấp để tải ảnh lên
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF tối đa 10MB (tối đa 3 ảnh)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Previews */}
                {imagePreviewUrls.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      Ảnh đã chọn ({imagePreviewUrls.length}/3):
                    </p>
                    <div className="flex space-x-3 overflow-x-auto pb-2">
                      {imagePreviewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="h-20 w-20 object-cover rounded-lg border-2 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full">
              <MessageCircle className="mr-2 h-4 w-4" />
              Gửi đánh giá
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Chưa có đánh giá nào. Hãy là người đầu tiên chia sẻ trải nghiệm của
            bạn!
          </p>
        ) : (
          reviews?.map((review) => (
            <ReviewItem
              key={review.review_id}
              review={review}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              newReply={newReply}
              setNewReply={setNewReply}
              handleSubmitReply={handleSubmitReply}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
