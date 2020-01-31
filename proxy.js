class Base {
  constructor(){
    this._test = 'foo'
  }
  say(){
    return this._test
  }
}


const C = new Proxy(Base, {
  construct(Ctor, args){
    return new Proxy(new Ctor(args), {
      get(target, prop){
        console.log(66, prop)
        return target[prop]
      }
    })
  }
})


const c = new C()


c.say()
