import { StaffBranchType } from "@/services/warranty/settingsActions";
import StaffTableRow from "./StaffTableRow";

type Props = {
  data: StaffBranchType[];
};

const StaffTable = ({ data }: Props) => {
  return (
    <div className="user-tab">
      <div className="tab-head flex [&>div]:w-full [&>div]:px-2 [&>div]:py-1">
        <div className="">
          <span>Staff Name</span>
        </div>
        <div className="max-w-[150px]">
          <span>Branch</span>
        </div>
        <div className="max-w-[150px]">
          <span>Color</span>
        </div>
        <div className="max-w-[150px]">
          <span>Actions</span>
        </div>
      </div>
      <div className="tab-body">
        {data ? (
          data.length > 0 ? (
            data.map((item) => (
              <StaffTableRow data={item} key={Number(item.id)} />
            ))
          ) : (
            <>
              <h2 className="text-center">No data</h2>
            </>
          )
        ) : (
          <>
            <h2 className="text-center">Loading data..</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default StaffTable;
