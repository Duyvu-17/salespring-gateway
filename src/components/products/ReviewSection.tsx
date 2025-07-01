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
  Camera,
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
import { reviewService } from "@/services/review.service";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

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
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

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
    // Kiểm tra đăng nhập
    if (!isAuthenticated) {
      navigate("/login")
      return;
    }
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

  // Thêm hàm xử lý like review
  const handleLikeReview = async (reviewId: number) => {
    try {
      await reviewService.likeReview(reviewId);
      toast({ title: "Cảm ơn bạn đã đánh giá hữu ích!" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Đã xảy ra lỗi";
      toast({
        title: "Không thể gửi đánh giá hữu ích",
        description: message,
        variant: "destructive",
      });
    }
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
              <div className="mt-2 space-y-3">
                {/* Compact Upload Button */}
                <div className="relative inline-block">
                  <input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 h-9 px-3 border-dashed hover:bg-gray-50"
                  >
                    <Camera className="h-4 w-4" />
                    Chọn ảnh
                    <span className="text-xs text-gray-500 ml-1">
                      (tối đa 3)
                    </span>
                  </Button>
                </div>

                {/* Image Previews */}
                {imagePreviewUrls.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Đã chọn {imagePreviewUrls.length}/3 ảnh:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {imagePreviewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="h-16 w-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-1 -right-1 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-sm"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Guidelines */}
                <p className="text-xs text-gray-500">
                  Hỗ trợ JPG, PNG, GIF. Tối đa 10MB mỗi ảnh.
                </p>
              </div>
            </div>

            <Button type="submit" className="w-40">
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
              handleLikeReview={handleLikeReview}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
