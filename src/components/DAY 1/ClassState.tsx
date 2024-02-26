import { Component } from "react";

interface CountInput {
  count: number;
  name: string;
}

export class ClassState extends Component<CountInput> {
  state = {
    count: this.props.count,
    name: this.props.name,
  };

  render() {
    return (
      <>
        <div className="flex-col items-center justify-center w-screen">
          <div className="flex justify-center items-center">
            <h1>ClassState</h1>
          </div>
          <div className="flex justify-center items-center gap-5 mt-5">
            <button className="px-5 py-2 bg-green-500" onClick={() => this.setState({ count: this.state.count + 1 })}>
              Add
            </button>
            <input type="text" className="px-10 py-3 rounded-md text-center" value={this.state.count} />
            <button className="px-5 py-2 bg-yellow-400" onClick={() => this.setState({ count: this.state.count - 1 })}>
              Min
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ClassState;
