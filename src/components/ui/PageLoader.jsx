

const PageLoader = ({ className }) => {
  return (
    <div className={`h-[60vh] flex justify-center items-center ${className}`}>
      <div className="custom-loader"></div>
    </div>
  )
}

export default PageLoader