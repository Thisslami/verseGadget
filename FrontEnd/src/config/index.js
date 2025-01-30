

export const registerFormControls = [
    {
      name: "userName",
      label: "User Name",
      placeholder: "Enter your user name",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];

  export const loginFormControls = [
   
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];


  export const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter gadget title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter gadget description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "smartphones", label: "Smartphones" },
        { id: "laptops", label: "Laptops" },
        { id: "tablets", label: "Tablets" },
        { id: "smartwatches", label: "smartwatches" },
        { id: "accessories", label: "Accessories" },
        { id: "products", label: "products" },
      ],
    },
    {
      label: "Brand",
      name: "brand",
      componentType: "select",
      options: [
        { id: "apple", label: "Apple" },
        { id: "samsung", label: "Samsung" },
        { id: "sony", label: "Sony" },
        { id: "dell", label: "Dell" },
        { id: "hp", label: "HP" },
        { id: "lenovo", label: "Lenovo" },
      ],
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter gadget price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];

  export const shoppingViewHeaderMenuItems = [
    {
      id: "home",
      label: "Home",
      path: "/shop/home",
    },
    {
      id: "products",
      label: "Products",
      path: "/shop/listing",
    },
    {
      id: "tablets",
      label: "Tablets",
      path: "/shop/listing",
    },
    {
      id: "smartphones",
      label: "Smartphones",
      path: "/shop/listing",
    },
    {
      id: "laptops",
      label: "Laptops",
      path: "/shop/listing",
    },
    {
      id: "accessories",
      label: "Accessories",
      path: "/shop/listing",
    },
    // {
    //   id: "search",
    //   label: "Search",
    //   path: "/shop/search",
      
    // },
  ];

  export const categoryOptionsMap = {
     smartphones : "Smartphones" ,
     laptops : "Laptops" ,
    tablets : "Tablets" ,
     smartwatches : "Smartwatches" ,
    accessories : "Accessories",
    products : "Products",
    other : "Other",
  };

  export const brandOptionsMap = {
    apple : "Apple" ,
    samsung : "Samsung" ,
    sony : "Sony" ,
    dell : "Dell" ,
    hp : "HP" ,
    lenovo : "Lenovo",
    other : "Other",
  };

  export const filterOptions = {
    category: [
      { id: "smartphones", label: "Smartphones" },
      { id: "laptops", label: "Laptops" },
      { id: "tablets", label: "Tablets" },
      { id: "smartwatches", label: "Smartwatches" },
      { id: "accessories", label: "Accessories" },
    ],
    brand: [
      { id: "apple", label: "Apple" },
      { id: "samsung", label: "Samsung" },
      { id: "sony", label: "Sony" },
      { id: "dell", label: "Dell" },
      { id: "hp", label: "HP" },
      { id: "lenovo", label: "Lenovo" },
    ],
  };
  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
    // { id: "popularity", label: "Most Popular" },
  ];
  

  export const addressFormControls = [
    {
      label: "Address",
      name: "address",
      componentType: "input",
      type: "text",
      placeholder: "Enter your address",
    },
    {
      label: "City",
      name: "city",
      componentType: "input",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      label: "Pincode",
      name: "pincode",
      componentType: "input",
      type: "text",
      placeholder: "Enter your pincode",
    },
    {
      label: "Phone",
      name: "phone",
      componentType: "input",
      type: "text",
      placeholder: "Enter your phone number",
    },
    {
      label: "Notes",
      name: "notes",
      componentType: "textarea",
      placeholder: "Enter any additional notes",
    },
  ];
  