import React, { useState, useEffect } from "react";
import { FaSearch, FaCopy } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createWeb3Name } from "@web3-name-sdk/core";

const web3name = createWeb3Name();

function Search(props) {
  const [copied, setCopied] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [domains, setDomains] = useState([]);
  const [address, setAddress] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = async () => {
    console.log("Searching for:", inputValue);
    try {
      const resolvedAddress = await web3name.getAddress(inputValue);
      console.log("Resolved address:", resolvedAddress);
      if (resolvedAddress && resolvedAddress !== "0000000") {
        setAddress(resolvedAddress);
        props.callback(resolvedAddress);
        setDomains([
          { id: inputValue, resolvedAddress: { id: resolvedAddress } },
        ]);
      } else {
        console.error("Error: Address not found or invalid.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };



  return (
    <>
      <div className="mt-[15px] flex justify-between rounded-xl border-solid border-2 border-transparent h-[60px] p-[10px] w-[400px] mx-auto bg-slate-300 shadow-2xl bg-gradient-to-l from-purple-300 via-purple-300 to-purple-400">
        <div className="w-[400px] border border-transparent hover:border-slate-800 mr-[10px] rounded-xl h-[40px] flex hover:border-solid hover:border-2 font-medium text-lg px-[10px]">
          <input
            className="h-[40px] w-[300px] overflow-hidden focus:outline-none bg-transparent"
            type="text"
            id="myInput"
            value={inputValue}
            placeholder="Type- name.bnb"
            onChange={handleInputChange}
          />
          <div className="flex items-center mr-[5px] text-slate-800">
            <button onClick={handleSearch}>
              <FaSearch size={30} />
            </button>
          </div>
        </div>
      </div>

      <div className="border border-transparent mt-[40px] flex flex-col justify-center shadow-sm ">
        <div className="mt-[40px] text-2xl font-medium text-slate-800">
          <span className="shadow-xl">Account</span>
        </div>
        <div className="text-slate-800 text-lg font-semibold mt-[5px] mx-auto items-center h-[40px] w-[900px] bg-purple-300 border rounded-xl border-transparent hover:scale-110 transition-all duration-500 ease-in-out bg-gradient-to-l from-purple-300 via-purple-300 to-purple-400">
          {domains.length > 0 &&
            domains.map((domain, index) => (
              <div key={index}>
                {domain.resolvedAddress.id}
                <CopyToClipboard
                  onCopy={handleCopy}
                  text={domain.resolvedAddress.id}
                >
                  <button className="ml-[50px]">
                    <FaCopy />
                  </button>
                </CopyToClipboard>
                {copied && <span>copied</span>}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Search;
