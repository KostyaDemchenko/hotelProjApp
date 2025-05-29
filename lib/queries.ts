import { groq } from "next-sanity";

export const roomsQuery = groq`
  *[_type == "room"]{
    _id,
    room_name,
    room_description,
    room_price,
    room_photos,
    room_size,
    room_beds
  } | order(room_id asc)
`;
