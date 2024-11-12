type Props = {};

const Branch = (props: Props) => {
  return (
    <>
      <div className="hidden md:flex flex-col gap-16 w-full px-16 py-4">
        <div className="top nav w-full flex justify-end"></div>
        <div className="main-table flex flex-col gap-4">
          {/* <h2>{branch?.name} Warranty</h2> */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex gap-4 items-center">
                {/* <p
                  className={`
              bg-transparent border-zinc-800 border-[1px] px-4 py-2 rounded-md flex gap-2 w-[210px]
              ${searchFocus ? "!border-zinc-400" : ""}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-white w-4"
                  >
                    <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                  </svg>
                  <input
                    type="text"
                    value={values.search}
                    name="search"
                    onChange={(e) => inputChange(e)}
                    onBlur={() => {
                      setTimeout(() => {
                        setSearchFocus(false);
                      }, 100);
                    }}
                    onFocus={() => setSearchFocus(true)}
                    className={`bg-transparent outline-none w-full`}
                    placeholder="Search"
                  />
                </p> */}
                {/* <DropdownIdv
                  minSize="147"
                  values={searchFilter.current}
                  options={searchOptions}
                  setValues={searchFilter}
                /> */}
              </div>
              <div className="flex gap-4">
                <button
                  className={`
                        px-4 py-2 rounded-md transition-all border-[1px]
                        bg-transparent border-zinc-600 text-zinc-600
                        mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400`}
                  onClick={() => {
                    setTimeout(() => {
                      // setNewEntry(!newEntry);
                    }, 50);
                  }}
                >
                  <p>Refresh Data</p>
                </button>
                {/* <Link href={`/warranty/history/${branch?.id}`} target="_blank">
                  <button
                    className={`
                          px-4 py-2 rounded-md transition-all border-[1px]
                          bg-transparent border-zinc-600 text-zinc-600
                          mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400`}
                  >
                    <p>History</p>
                  </button>
                </Link> */}
                <button
                  className={`
                        px-4 py-2 rounded-md transition-all border-[1px]
                        border-transparent bg-accent
                        mobilehover:hover:bg-accent/80`}
                  onClick={() => {
                    // addDB();
                    // if (socket === null) return;
                    // socket.emit("re-render", { string: "render" });
                  }}
                >
                  <p>
                    <b>New Entry</b>
                  </p>
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="border-zinc-800 text-zinc-800 p-1 rounded-md transition-all border-[1px] bg-transparent flex gap-1">
                {/* {sortingList &&
                  sortingList.map((sort, key) => {
                    return (
                      <div
                        key={key}
                        draggable
                        onDragStart={(e) => handleOnDrag(e, sort.type)}
                        onDrop={(e) => handleOnDrop(e, sort.type)}
                        onDragOver={handleDragOver}
                        className="h-full"
                      >
                        <DropdownSort
                          key={key}
                          values={sort}
                          setOptions={setSortOpt}
                          setValues={setSortingList}
                        />
                      </div>
                    );
                  })} */}
                {/* <DropdownSortAdd
                  values="+ Add Sort"
                  setValues={setSortingList}
                  setOptions={setSortOpt}
                  options={sortOpt}
                /> */}
              </div>
            </div>
          </div>
          {/* <Tables
            id="local"
            branch={branch}
            data={data}
            updateDB={updateDB}
            deleteDB={deleteDB}
            updateAllDB={updateDBWithChanges}
            setNewEntry={setNewEntry}
            page={page.local}
            handleSetPage={handleSetPage}
            lockTable={false}
          /> */}
        </div>
        <div className="other-table flex flex-col gap-4">
          <h2>Other Branch Warranty</h2>
          <div className="flex justify-between">
            {/* <p
              className={`
          bg-transparent border-zinc-800 border-[1px] px-4 py-2 rounded-md flex gap-2 w-[250px]
          ${searchFocus ? "!border-zinc-400" : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-white w-4"
              >
                <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
              </svg>
              <input
                type="text"
                value={values.search}
                name="search"
                onChange={(e) => inputChange(e)}
                onBlur={() => {
                  setTimeout(() => {
                    setSearchFocus(false);
                  }, 100);
                }}
                onFocus={() => setSearchFocus(true)}
                className={`bg-transparent outline-none w-full`}
                placeholder="Search Service No"
              />
            </p> */}
          </div>
          {/* <Tables
            id="other"
            branch={branch}
            data={dataOther}
            updateDB={updateDB}
            deleteDB={deleteDB}
            updateAllDB={updateDBWithChanges}
            setNewEntry={setNewEntry}
            page={page.other}
            handleSetPage={handleSetPage}
            lockTable={true}
          /> */}
        </div>
      </div>
      <div
        // data-open={disconnected}
        className="data-[open=true]:block data-[open=false]:hidden fixed z-[4] bg-black/50 w-[100vw] h-[100vh] top-0 left-0"
      >
        <div
          className="
    max-w-[500px] bg-zinc-900 border-zinc-700 border-[1px] p-8 rounded-md m-auto translate-y-[150%]
    flex flex-col gap-4
    "
        >
          <h3>Refresh now!</h3>
          <span>A new version is available.</span>
          <div className="flex gap-2 justify-end">
            <button
              className={`
                          px-4 py-2 rounded-md transition-all border-[1px]
                          bg-transparent border-zinc-600 text-zinc-600
                          mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400`}
              onClick={() => {
                // setDisconnected(false);
              }}
            >
              <p>Cancel</p>
            </button>
            <button
              className={`
                          px-4 py-2 rounded-md transition-all border-[1px]
                          bg-transparent border-sky-600 text-sky-600
                          mobilehover:hover:border-sky-400 mobilehover:hover:text-sky-400`}
              onClick={() => {
                window.location.reload();
              }}
            >
              <p>Refresh</p>
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden flex justify-center items-center h-[100vh] text-center w-full">
        <h2>Use Desktop PC</h2>
      </div>
    </>
  );
};

export default Branch;
