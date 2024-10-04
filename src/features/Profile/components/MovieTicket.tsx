import React from 'react';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';

interface MovieTicketProps {
  title: string;
  genres: string[];
  duration: string;
  location: string;
  hall: string;
  date: string;
  time: string;
  age: string;
  row: string;
  seat: string;
  price: string;
  screen: string;
  language: string;
  subtitles: string;
  posterUrl: string;
}

const MovieTicket: React.FC<MovieTicketProps> = ({
  title,
  genres,
  duration,
  location,

  date,
  time,

  seat,
  price,

  posterUrl,
}) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg  max-w-[600px]">
      <div className="flex gap-x-5">
        {/* <div className="w-1/3 md:block no">
          <Image
            src={posterUrl}
            alt={title}
            width={200}
            height={300}
            className="rounded-md "
          /> */}
        {/* </div> */}
        <div className="w-2/3 ">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          {/* <p className="text-sm text-gray-400 mb-2">{genres.join(', ')}</p> */}
          <div className=" text-sm">
            <div>
              <p><span className="font-semibold">Duration:</span> {duration}</p>
              <p><span className="font-semibold">Location:</span> {location}</p>
              <p><span className="font-semibold">Date:</span> {date}</p>
              <p><span className="font-semibold">Time:</span> {time}</p>
              <p><span className="font-semibold">Seat:</span> {seat}</p>
              <p><span className="font-semibold">Price:</span> {price}</p>
            </div>

          </div>
          <div className="mt-4 flex justify-start">
            <QRCodeSVG value={`${title}-${date}-${time}-${seat}`} size={100} />
            <Image
              src={posterUrl}
              alt={title}
              width={200}
              height={300}
              className="rounded-md md:hidden"
            />
          </div>
        </div>
      </div>

    </div >
  );
};

export default MovieTicket;