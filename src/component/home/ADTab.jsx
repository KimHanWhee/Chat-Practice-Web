import { Carousel } from "@material-tailwind/react";

const ADTab = () => {
  const imgList = [
    {
      src: "https://plus.unsplash.com/premium_photo-1681488060968-ee7b2f6d8751?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1566&q=80",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1683121963424-400f37ed52d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1612&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    },
  ];
  return (
    <Carousel
      autoplay={true}
      autoplayDelay={3000}
      loop={true}
      transition={{ duration: 0.5 }}
      className="h-96"
    >
      {imgList.map((el) => (
        <img src={el.src} className="h-full w-full object-cover" />
      ))}
    </Carousel>
  );
};

export default ADTab;
