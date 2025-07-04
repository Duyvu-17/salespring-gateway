import { Star, Reply, ThumbsUp, Send, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ReviewItem = ({
  review,
  replyingTo,
  setReplyingTo,
  newReply,
  setNewReply,
  handleSubmitReply,
  handleLikeReview,
}) => {
  const [liking, setLiking] = React.useState(false);
  const navigate = useNavigate();
  const [helpfulCount, setHelpfulCount] = React.useState(
    review.helpful_count || 0
  );
  const { toast } = useToast();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const onLike = async () => {
    if (liking) return;
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setLiking(true);
    try {
      await handleLikeReview?.(review.review_id);
      setHelpfulCount((c) => c + 1);
    } catch (err) {
      toast({
        title: "Không thể gửi đánh giá hữu ích",
        variant: "destructive",
      });
    } finally {
      setLiking(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar>
              {review.user && review.user.avatar ? (
                <AvatarImage
                  src={review.user.avatar}
                  alt={review.user.full_name}
                />
              ) : review.userAvatar ? (
                <AvatarImage src={review.userAvatar} alt={review.userName} />
              ) : (
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h4 className="font-semibold">
                {review.user && review.user.full_name
                  ? review.user.full_name
                  : review.userName}
              </h4>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{review.date || review.created_at}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(review.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : i < review.rating
                    ? "text-yellow-400 fill-yellow-400 opacity-50"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        {/* Hiển thị title, content, comment */}
        {review.title && (
          <h4 className="font-semibold text-base mb-1">{review.title}</h4>
        )}
        {review.content && <p className="mb-2">{review.content}</p>}
        {!review.content && review.comment && (
          <p className="mb-2">{review.comment}</p>
        )}
        {review.images && review.images.length > 0 && (
          <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
            {review.images.map(
              (img: { id: number; image_url: string }, index: number) => (
                <img
                  key={img.id || index}
                  src={img.image_url}
                  alt={`Review ${index + 1}`}
                  className="h-24 w-24 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => window.open(img.image_url, "_blank")}
                />
              )
            )}
          </div>
        )}
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (replyingTo === review.review_id) {
                setReplyingTo(null);
              } else {
                setReplyingTo(review.review_id);
                setNewReply("");
              }
            }}
          >
            <Reply className="mr-1 h-4 w-4" />
            Trả lời
          </Button>
          <Button variant="ghost" size="sm" onClick={onLike} disabled={liking}>
            {liking ? (
              <span className="mr-1">
                <svg
                  className="animate-spin h-4 w-4 inline"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              </span>
            ) : (
              <ThumbsUp className="mr-1 h-4 w-4" />
            )}
            Hữu ích ({helpfulCount})
          </Button>
        </div>
        {/* Chỉ review có replyingTo === review.review_id mới hiển thị form trả lời */}
        {replyingTo === review.review_id && (
          <div className="mt-4 flex items-start space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Viết phản hồi..."
                className="resize-none text-sm"
                rows={2}
              />
              <div className="flex justify-end mt-2 space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setReplyingTo(null)}
                >
                  Hủy
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleSubmitReply(review.review_id)}
                >
                  <Send className="mr-1 h-3 w-3" />
                  Trả lời
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* Replies */}
        {review.replies && review.replies.length > 0 && (
          <div className="mt-4 space-y-4">
            <Separator />
            <div className="space-y-4 pl-6 border-l-2 border-muted mt-2">
              {review.replies.map(
                (reply: {
                  id?: number;
                  userAvatar?: string;
                  userName: string;
                  date: string;
                  comment: string;
                }) => (
                  <div key={reply.id} className="mt-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-6 w-6">
                        {reply.userAvatar ? (
                          <AvatarImage
                            src={reply.userAvatar}
                            alt={reply.userName}
                          />
                        ) : (
                          <AvatarFallback>
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <h5 className="font-semibold text-sm">
                          {reply.userName}
                        </h5>
                        <div className="text-xs text-muted-foreground">
                          {reply.date}
                        </div>
                      </div>
                    </div>
                    <p className="mt-1 text-sm pl-9">{reply.comment}</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewItem;
