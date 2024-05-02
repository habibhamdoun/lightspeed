import { Montserrat } from 'next/font/google';
import './globals.css';
import { AppWrapper } from '@/context';

const inter = Montserrat({
  subsets: ['latin'],
  weight: ['400', '800'],
});

export const metadata = {
  title: 'LightSpeed',
  description:
    "Lightspeed Sportswear is the ultimate destination for athletes and fitness enthusiasts who demand the best in performance apparel. At Lightspeed, we believe that your sportswear should be as dynamic and resilient as you are. Our store features a wide range of high-quality, innovative athletic garments designed to enhance your performance and comfort, no matter your sport of choice. From advanced moisture-wicking fabrics to cutting-edge, aerodynamic fits, each piece in our collection is crafted to help you achieve your personal best. Whether you're a seasoned runner looking for the perfect running shorts, a yoga enthusiast in search of supportive gear, or a competitive athlete seeking sport-specific attire, Lightspeed has something to elevate every workout. We are committed to providing you with sportswear that not only performs exceptionally but also embodies modern style and durability. Explore our extensive lineup of athletic wear and accessories, and discover why Lightspeed is the preferred choice for athletes around the globe. Step into Lightspeed Sportswear and experience the fusion of performance, innovation, and style.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <AppWrapper>
        <body className={inter.className}>{children}</body>
      </AppWrapper>
    </html>
  );
}
