import { BranchStatus, DataValues } from "@/app/warranty/[branch]/page-old";
import { cn } from "@/lib/utils";

type Props = {
  boxSize: number;
  id: string | null;
  buttonId: string;
  status: BranchStatus[];
  status_all: BranchStatus[];
  values: string | null;
  setOpenClose: (id: string, newValue: boolean) => void;
  openClose: boolean;
  setInputValues: (id: string, value: string) => void;
  updateDB: (id: string, column: string, value: string) => void;
  clearExtRef: () => void;
};

type InputState = {
  values: DataValues;
};

const Dropdown = ({
  boxSize,
  id,
  buttonId,
  status,
  status_all,
  values,
  setOpenClose,
  openClose,
  setInputValues,
  updateDB,
  clearExtRef,
}: Props) => {
  return (
    <div
      role="button"
      className={`max-w-[${boxSize}px] whitespace-nowrap relative px-2 py-1`}
      onClick={() => setOpenClose(buttonId, true)}
    >
      {status_all &&
        status_all.map((status, key) => {
          if (status.type === values)
            return (
              <div
                key={key}
                role="button"
                className={cn(`rounded-md w-max px-2`, status.color)}
              >
                <span>{values}</span>
              </div>
            );
        })}
      {openClose && (
        <div className="z-[2] absolute w-min left-0 top-0 py-2 flex flex-col rounded-md bg-zinc-800">
          {status &&
            status.map((status, key) => {
              if (!status.type.includes("From"))
                return (
                  <div
                    key={key}
                    role="button"
                    className="row-cont px-2 py-1 mobilehover:hover:bg-zinc-700"
                    onClick={() => {
                      // console.log(buttonId, status.type, "checkdrop");
                      setInputValues(buttonId, status.type);
                      updateDB(id ? id : "", buttonId, status.type);
                      setTimeout(() => {
                        setOpenClose(buttonId, false);
                      }, 50);
                    }}
                  >
                    <div
                      className={cn(
                        status.color,
                        `rounded-md w-max leading-none px-2 py-[2px]`
                      )}
                    >
                      <span>{status.type}</span>
                    </div>
                  </div>
                );
            })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
