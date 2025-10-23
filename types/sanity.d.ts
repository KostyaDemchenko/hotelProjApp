//типизация всех наших переменных из таблиц
export interface RoomAddition {
  _key: string;
  title: string;
  icon: string;
}

export interface RoomUnavailableRange {
  _key: string;
  from: string;
  to: string;
}

export interface RoomPhoto {
  _key: string;
  asset: { _ref: string; _type: "reference" };
  _type: "image";
}

export interface Room {
  _id: string;
  room_id: string;
  room_name: string;
  room_description: string;
  room_price: number;
  room_size: number;
  room_beds: number;
  room_max_people: number;
  room_max_child: number;
  room_photos: RoomPhoto[];
  room_additions: RoomAddition[];
  room_unavailable_ranges: RoomUnavailableRange[];
}
