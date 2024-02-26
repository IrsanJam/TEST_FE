import { Component } from "react";

export class Card extends Component {
  render() {
    return (
      <div className="h-64 w-full bg-primary flex justify-center items-center gap-2 p-3">
        <img className="h-full w-full  " src="https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/23/2023/08/25/Dont-open-mail-from-strangers-2023-08-25T233037619-461257568.png" alt="zhao-lusi" />
        <div className="flex-col items-center justify-center w-1/2">
          <h3 className="text-black">Riceball</h3>
          <p className="text-xs text-black">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere impedit, facilis eum pariatur libero adipisci numquam sapiente iusto ipsum autem obcaecati ullam accusamus nemo rerum architecto voluptatibus. Mollitia, est sit!
          </p>
        </div>
      </div>
    );
  }
}

export default Card;
