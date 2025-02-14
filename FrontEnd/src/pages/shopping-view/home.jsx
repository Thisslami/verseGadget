import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Airplay,
  Apple,
  Camera,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Laptop,
  LaptopMinimal,
  ShoppingBag,
  ShoppingBasketIcon,
  Smartphone,
  Tablet,
  TabletSmartphone,
  Tv,
  Watch,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
// import { fetchProductDetails } from "@/store/shop/products-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "smartphones", label: "Smartphones", icon: Smartphone },
  { id: "laptops", label: "Laptops", icon: Laptop },
  { id: "tablets", label: "Tablets", icon: Tablet },
  { id: "smartwatches", label: "smartwatches", icon: Watch },
  { id: "accessories", label: "Accessories", icon: CloudLightning },
  { id: "products", label: "products", icon: ShoppingBag },
];

const brandsWithIcon = [
  { id: "apple", label: "Apple", icon: Apple },
  { id: "samsung", label: "Samsung", icon: Airplay },
  { id: "sony", label: "Sony", icon: Camera },
  { id: "dell", label: "Dell", icon: LaptopMinimal },
  { id: "hp", label: "HP", icon: TabletSmartphone },
  { id: "lenovo", label: "Lenovo", icon: Tv },
];

const supportFeatures = [
  {
    image:
      "https://media.istockphoto.com/id/1489988162/video/delivery-truck-animation-4k-video-on-white-background.jpg?s=640x640&k=20&c=vDTwAczI8Y5XrGq_Qu5CPsQh9zE5T0mq8VXXobGtOWQ=",
    title: "Free Shipping",
    description:
      "Our fast shipping policy applies to all orders, regardless of the order value or destination.",
  },
  {
    image:
      "https://img.freepik.com/premium-vector/mobile-banking-payment-by-credit-card-using-smartphone-pos-terminal-confirms-payment-nfc-payments-scan-pay-payment-using-phone-scan-qr-code-contactless-payment-cashless-technology_435184-668.jpg",
    title: "Secure Payment",
    description:
      "Your payment is always safe, secure, and protected at all times.",
  },
  {
    image:
      "https://www.shutterstock.com/shutterstock/videos/1103413579/thumb/12.jpg?ip=x480",
    title: "24/7 Support",
    description:
      "We are available 24/7 to assist you with any question, or issues you may have.",
  },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const { user } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Custom shuffle function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  useEffect(() => {
    // Initial shuffle
    shuffleFeaturedProducts();

    // Set interval to reshuffle every hour
    const interval = setInterval(shuffleFeaturedProducts, 60 * 60 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [productList]);

  const shuffleFeaturedProducts = () => {
    if (productList.length > 0) {
      const shuffledProducts = shuffleArray([...productList]).slice(0, 8); // Shuffle and take first 8
      setFeaturedProducts(shuffledProducts);
    }
  };

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }


  function handleAddToCart(getCurrentProductId) {
    if (!user) {
      navigate("/auth/login"); 
      toast({
        title: "Please login to add to cart.",
        variant: "destructive",
      });
      return; 
    }

    console.log("Adding to Cart:", {
      userId: user?.id,
      productId: getCurrentProductId,
      quantity: 1,
    });

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product added to cart!",
        });
      } else if(data?.payload?.message){
        toast({
          title: data?.payload?.message,
        })
      }
    });
  }

  useEffect(() => {
    console.log("Product Details Updated:", productDetails);
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    if (productList.length > 4) {
      const interval = setInterval(() => {
        setFeaturedIndex((prevIndex) => (prevIndex + 4) % productList.length);
      }, 8000);

      return () => clearInterval(interval); // Cleanup to prevent memory leaks
    }
  }, [productList]);

  useEffect(() => {
    if (productList.length === 0) {
      dispatch(
        fetchAllFilteredProducts({
          filterParams: {},
          sortParams: "price-lowtohigh",
        })
      );
    }
  }, [dispatch, productList.length]);

  // console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  const displayedProducts =
    productList.length > 4
      ? [...productList, ...productList].slice(featuredIndex, featuredIndex + 4)
      : productList;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <motion.img
                src={slide?.image}
                key={index}
                className={`absolute top-0 left-0 w-full h-full object-cover`}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlide ? 1 : 0 }}
                transition={{ duration: 1 }}
              />
            ))
          : null}
        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className="py-12">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8">Trending Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {displayedProducts.length > 0 &&
        displayedProducts.map((productItem, index) => (
          <motion.div
            key={productItem.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
            className="cursor-pointer"
          >
            <ShoppingProductTile
              handleGetProductDetails={handleGetProductDetails}
              product={productItem}
              handleAddToCart={handleAddToCart}
            />
          </motion.div>
        ))}
    </div>
  </div>
</section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoriesWithIcon.map(({ id, label, icon: Icon }) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  onClick={() =>
                    handleNavigateToListingPage({ id }, "category")
                  }
                  className="cursor-pointer hover:shadow-lg"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Icon className="w-12 h-12 mb-4 text-primary-500" />
                    <span className="font-bold">{label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map(({ id, label, icon: Icon }) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  onClick={() => handleNavigateToListingPage({ id }, "brand")}
                  className="cursor-pointer hover:shadow-lg"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Icon className="w-12 h-12 mb-4 text-primary-500" />
                    <span className="font-bold">{label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    

      <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((productItem, index) => (
            <motion.div
              key={productItem.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <ShoppingProductTile
                handleGetProductDetails={handleGetProductDetails}
                product={productItem}
                handleAddToCart={handleAddToCart}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>


      <section className="py-12 bg-gray-50">
        {" "}
        {/* Added background color */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="flex justify-center" // Center the card
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="w-full sm:w-72">
                  {" "}
                  <CardContent className="flex flex-col items-center p-6">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      width={200} // Set appropriate width
                      height={150} // Set appropriate height
                      className="mb-4 object-cover" // Make image responsive and cover container
                    />
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-center text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
