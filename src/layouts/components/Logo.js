// Logo component
const Logo = (props) => {
  if (props.white) {
    return <img src='/images/logo-white.png'  width={props.width} height={props.height} />  
  }
  return <img src='/images/logo.png'  width={props.width} height={props.height} />
}

export default Logo
