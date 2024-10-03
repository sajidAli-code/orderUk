const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-800 pt-12">
            <div className="mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-12">
                {/* Logo and Download Links */}
                <div>
                    <img
                        src="./images/footerLogo.png"
                        alt="logo"
                        className=" w-56"
                    />
                </div>

                {/* Email Subscription */}
                <div className=" col-span-2">
                    <h3 className=" text-base font-semibold">Get Exclusive Deals in your Inbox</h3>
                    <div className="flex items-center my-6 relative w-96">
                        <input
                            type="text"
                            placeholder="e.g. mail@mail.com"
                            className="border border-gray-300 rounded-full py-2 px-4 w-full pr-16"
                        />
                        <button className="absolute bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 right-0 mr-1">
                            Subscribe
                        </button>
                    </div>
                    <p className="text-xs mt-1 mx-1">
                        we won't spam, read our{' '}
                        <a href="#" className="underline">
                            email policy
                        </a>
                    </p>
                    {/* Social Icons */}
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="text-gray-600">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="text-gray-600">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="text-gray-600">
                            <i className="fab fa-tiktok"></i>
                        </a>
                        <a href="#" className="text-gray-600">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>

                {/* Legal Pages */}
                <div>
                    <h3 className=" text-base font-semibold">Legal Pages</h3>
                    <ul className="mt-4 space-y-2 text-xs">
                        <li>
                            <a href="#" className="hover:underline">
                                Terms and conditions
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Privacy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Cookies
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Modern Slavery Statement
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Important Links */}
                <div>
                    <h3 className="text-base font-semibold">Important Links</h3>
                    <ul className="mt-4 space-y-2 text-xs">
                        <li>
                            <a href="#" className="hover:underline">
                                Get help
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Add your restaurant
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Sign up to deliver
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Create a business account
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-gray-900 text-gray-400 py-4 mt-8">
                <div className="container text-center flex flex-row justify-between items-center px-4">
                    <p className="text-sm">
                        Order.uk Copyright 2024, All Rights Reserved.
                    </p>
                    <div className="mt-2 flex justify-center space-x-6 text-xs">
                        <a href="#" className="hover:underline">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:underline">
                            Terms
                        </a>
                        <a href="#" className="hover:underline">
                            Pricing
                        </a>
                        <a href="#" className="hover:underline">
                            Do not sell or share my personal information
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;  