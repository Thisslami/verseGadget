


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
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import { getFeatureImages } from "@/store/common-slice";
import { FaTruck, FaCreditCard, FaHeadset } from "react-icons/fa";
import CustomerReviews from "@/components/shopping-view/customer-reviews";

const categoriesWithIcon = [
  { id: "smartphones", label: "Smartphones", icon: Smartphone },
  { id: "laptops", label: "Laptops", icon: Laptop },
  { id: "tablets", label: "Tablets", icon: Tablet },
  { id: "smartwatches", label: "Smartwatches", icon: Watch },
  { id: "accessories", label: "Accessories", icon: CloudLightning },
  { id: "products", label: "All Products", icon: ShoppingBag },
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
    icon: FaTruck,
    title: "Swift & Secure Delivery",
    description: "Our fast delivery policy applies to all orders, regardless of the order value or destination.",
  },
  {
    icon: FaCreditCard,
    title: "Secure & Seamless Payment",
    description: "Your payment is always safe, secure, and protected at all times.",
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    description: "We are available 24/7 to assist you with any question, or issues you may have.",
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

  // Responsive breakpoints
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    shuffleFeaturedProducts();
    const interval = setInterval(shuffleFeaturedProducts, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [productList]);

  const shuffleFeaturedProducts = () => {
    if (productList.length > 0) {
      const shuffledProducts = shuffleArray([...productList]).slice(0, 8);
      setFeaturedProducts(shuffledProducts);
    }
  };

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = { [section]: [getCurrentItem.id] };
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

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product added to cart!" });
      } else if (data?.payload?.message) {
        toast({ title: data?.payload?.message });
      }
    });
  }

  useEffect(() => {
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
      return () => clearInterval(interval);
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

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  const displayedProducts =
    productList.length > 4
      ? [...productList, ...productList].slice(featuredIndex, featuredIndex + 4)
      : productList;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Slider */}
      <div className="relative w-full h-[200px] xs:h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] overflow-hidden">
        {featureImageList?.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute top-0 left-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={slide?.image}
              className="w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                onClick={() => navigate("/shop/listing")}
                className="bg-white text-black hover:bg-white/90 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-base font-bold shadow-lg flex items-center gap-2"
              >
                <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
                Shop Now
              </Button>
            </motion.div>
          </motion.div>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) % featureImageList.length
            )
          }
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)
          }
          className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>

      {/* Trending Products */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Trending Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {displayedProducts.map((productItem, index) => (
              <motion.div
                key={productItem.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
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

      <section className="py-8 sm:py-12 bg-gray-50 px-4 sm:px-6">
  <div className="max-w-7xl mx-auto">
    <div className="flex justify-start mb-6 sm:mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold">Shop by category</h2>
    </div>
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 xs:gap-3 sm:gap-4">
      {categoriesWithIcon.map(({ id, label, icon: Icon }) => (
        <motion.div
          key={id}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Card
            onClick={() => handleNavigateToListingPage({ id }, "category")}
            className="cursor-pointer hover:shadow-md h-full"
          >
            <CardContent className="flex flex-col items-center justify-center p-2 sm:p-3">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 text-primary" />
              <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-center leading-tight">
                {label}
              </span>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>

<section className="py-8 sm:py-12 bg-gray-50 px-4 sm:px-6">
  <div className="max-w-7xl mx-auto">
    <div className="flex justify-start mb-6 sm:mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold">Shop by Brand</h2>
    </div>
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 xs:gap-3 sm:gap-4">
      {brandsWithIcon.map(({ id, label, icon: Icon }) => (
        <motion.div
          key={id}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Card
            onClick={() => handleNavigateToListingPage({ id }, "brand")}
            className="cursor-pointer hover:shadow-md h-full"
          >
            <CardContent className="flex flex-col items-center justify-center p-2 sm:p-3">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 text-primary" />
              <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-center leading-tight">
                {label}
              </span>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Featured Products */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Featured Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {featuredProducts.map((productItem, index) => (
              <motion.div
                key={productItem.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
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

      {/* Support Features */}
      <section className="py-8 sm:py-12 bg-gray-50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {supportFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="flex justify-center"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="w-full">
                    <CardContent className="flex flex-col items-center p-4 sm:p-6">
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 mb-3 text-primary" />
                      <h3 className="font-bold text-base sm:text-lg mb-2 text-center">{feature.title}</h3>
                      <p className="text-xs sm:text-sm text-center text-gray-600">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CustomerReviews/>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;