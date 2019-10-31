import React, {Component} from 'react'
import {randomNumber} from '../modules/tsModule'

interface State {
  counter: number
  text: string
}

class C extends Component<any, State> {
  constructor(props: any){
    super(props)

    this.state = {
      counter: 0,
      text: ''
    }
  }

  render(){
    const {counter, text} = this.state
    return (
      <div>
        {counter}
        <pre>
          {text}
        </pre>
      </div>
    )
  }

  componentDidMount(){
    setInterval(() => {
      this.setState({
        counter: this.state.counter + 1,
        text: randomNumber(0, 10) + ''
      })
    }, 1000)
  }
}

export default C
