import './loader.css'

const Loader = () => {
    return (
        <div className='loader-container fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50'>
            <div className='loader-center ml-60'>
                <span className='loader-span'></span>
                <span className='loader-span'></span>
                <span className='loader-span'></span>
                <span className='loader-span'></span>
            </div>
            <div className="w-[25%] text-white">
                <h1 className="font-semibold text-3xl">Great! Get Ready To Explore</h1>
                <p>
                    <h2 className="text-xl my-2">#Travel Tips:</h2>
                    <ol className="list-disc list-inside space-y-2">
                        <li>Document Backup: Keep copies of important travel documents.</li>
                        <li>Packing Light: Focused on versatile clothing.</li>
                    </ol>
                </p>
            </div>

        </div>
    )
}

export default Loader