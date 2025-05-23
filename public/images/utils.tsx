import { StaticImageData } from "next/image";
import heroPlaceholder from "./hero-placeholder.jpg";
import logo from "./logo.svg";

// restorants
import restorant1 from "./restorant_1.jpg";
import restorant2 from "./restorant_2.jpg";
import restorant3 from "./restorant_3.jpg";
import restorant4 from "./restorant_4.jpg";
import restorant5 from "./restorant_5.jpg";

// about
import about1 from "./about_1.png";
import about2 from "./about_2.png";
import about3 from "./about_3.png";
import about4 from "./about_4.png";
import about5 from "./about_5.png";
import about6 from "./about_6.png";
import about7 from "./about_7.png";

const obj: { [key: string]: StaticImageData } = {
  heroPlaceholder,
  logo,

  // restorants
  restorant1,
  restorant2,
  restorant3,
  restorant4,
  restorant5,

  // about
  about1,
  about2,
  about3,
  about4,
  about5,
  about6,
  about7,
};

export default obj;
