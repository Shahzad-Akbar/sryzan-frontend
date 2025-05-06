const Loader = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-2">
        <div className="flex items-center justify-center">
          <div
            className="h-12 w-12 animate-spin rounded-full border-4 border-primary-2 border-t-transparent"
            role="status"
            aria-label="Loading"
          ></div>
        </div>
      </div>
    )
}

export default Loader;