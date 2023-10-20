import SingleCard from "@/components/modules/SingleCard";
import React from "react";
import db from '@/data/db.json';
import { SingleCardItem } from "@/models/modules/SingleCardModel";

function Home() {
  return (
    <div className="homes">
        {db.homes.slice(0, 6).map((homeItem:SingleCardItem)=> (
            <SingleCard item={homeItem} key={homeItem.id}/>
        ))}
    </div>
  );
}

export default Home;
