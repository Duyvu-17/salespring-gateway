
import React, { useState } from 'react';
import { 
  Star, 
  MessageCircle, 
  Image as ImageIcon, 
  Send, 
  Reply, 
  ThumbsUp, 
  User
} from 'lucide-react';
import { UserReview, Reply as ReplyType } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface ReviewSectionProps {
  productId: number;
  reviews: UserReview[];
  onAddReview: (review: Omit<UserReview, 'id'>) => void;
  onAddReply: (reviewId: number, reply: Omit<ReplyType, 'id'>) => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ 
  productId, 
  reviews, 
  onAddReview, 
  onAddReply 
}) => {
  const [newReview, setNewReview] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [newReply, setNewReply] = useState('');
  const [rating, setRating] = useState(5);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 3) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 3 images per review",
        variant: "destructive"
      });
      return;
    }

    setImages(files);
    
    // Create preview URLs
    const newImageUrls = files.map(file => URL.createObjectURL(file));
    setImagePreviewUrls(newImageUrls);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    // In a real app, we would upload the images first and get URLs
    // For this demo, we'll just use the preview URLs
    onAddReview({
      userId: "current-user",
      userName: "Current User",
      userAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80",
      rating,
      comment: newReview,
      date: new Date().toISOString().split('T')[0],
      images: imagePreviewUrls,
      replies: []
    });

    // Reset form
    setNewReview('');
    setRating(5);
    setImages([]);
    setImagePreviewUrls([]);

    toast({
      title: "Review added",
      description: "Your review has been added successfully!",
    });
  };

  const handleSubmitReply = (reviewId: number) => {
    if (!newReply.trim()) return;

    onAddReply(reviewId, {
      userId: "current-user",
      userName: "Current User",
      userAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80",
      comment: newReply,
      date: new Date().toISOString().split('T')[0],
    });

    setNewReply('');
    setReplyingTo(null);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>
      
      {/* Add Review Form */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <Label htmlFor="rating">Rating</Label>
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
              <Label htmlFor="comment">Your Review</Label>
              <Textarea
                id="comment"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Share your thoughts about this product..."
                className="mt-1 resize-none"
                rows={4}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="images">Add Images (optional)</Label>
              <div className="mt-1 space-y-2">
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="mt-1"
                />
                
                {imagePreviewUrls.length > 0 && (
                  <div className="flex space-x-2 mt-2 overflow-x-auto pb-2">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="h-20 w-20 object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              <MessageCircle className="mr-2 h-4 w-4" />
              Submit Review
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      {review.userAvatar ? (
                        <AvatarImage src={review.userAvatar} alt={review.userName} />
                      ) : (
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{review.userName}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{review.date}</span>
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
                
                <p className="mt-4">{review.comment}</p>
                
                {review.images && review.images.length > 0 && (
                  <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Review ${index + 1}`}
                        className="h-24 w-24 object-cover rounded-md cursor-pointer"
                        onClick={() => window.open(image, '_blank')}
                      />
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (replyingTo === review.id) {
                        setReplyingTo(null);
                      } else {
                        setReplyingTo(review.id);
                        setNewReply('');
                      }
                    }}
                  >
                    <Reply className="mr-1 h-4 w-4" />
                    Reply
                  </Button>
                  
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    Helpful
                  </Button>
                </div>
                
                {replyingTo === review.id && (
                  <div className="mt-4 flex items-start space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80" />
                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        placeholder="Write a reply..."
                        className="resize-none text-sm"
                        rows={2}
                      />
                      <div className="flex justify-end mt-2 space-x-2">
                        <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => handleSubmitReply(review.id)}>
                          <Send className="mr-1 h-3 w-3" />
                          Reply
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
                      {review.replies.map((reply) => (
                        <div key={reply.id} className="mt-2">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-6 w-6">
                              {reply.userAvatar ? (
                                <AvatarImage src={reply.userAvatar} alt={reply.userName} />
                              ) : (
                                <AvatarFallback>
                                  <User className="h-3 w-3" />
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div>
                              <h5 className="font-semibold text-sm">{reply.userName}</h5>
                              <div className="text-xs text-muted-foreground">
                                {reply.date}
                              </div>
                            </div>
                          </div>
                          <p className="mt-1 text-sm pl-9">{reply.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
