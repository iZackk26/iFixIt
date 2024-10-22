import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaPencilAlt, FaCheck} from "react-icons/fa";

interface WorksCardPropsType {
    title: string;
    options: string[];
    action: string;
    icon: string;
    detail: string;
}

function WorksCard({ title, options, icon, detail }: WorksCardPropsType) {
    return (
      <Card shadow={false} className="rounded-lg border border-gray-300 p-4">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="border border-gray-200 p-2.5 rounded-lg">
              {icon}
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 font-bold">
                {title}
              </Typography>
              <Typography className="!text-gray-600 text-xs font-normal">
                {detail}
              </Typography>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Button size="sm" variant="text" className="flex items-center gap-2">
              <FaPencilAlt className="h-4 w-4 text-gray-600" />
              <Typography className="!font-semibold text-xs text-gray-600 md:block hidden">
                In progress
              </Typography>
            </Button>
            <Button size="sm" variant="text" color="green" className="flex items-center gap-2">
              <FaCheck className="h-4 w-4 text-green-800" />
              <Typography className="!font-semibold text-xs text-green-800 md:block hidden">
                Completed
              </Typography>
            </Button>
          </div>
        </div>
        <div>
          {options && (
            <div>
              {Object.keys(options).map((label) => (
                <div key={label} className="flex gap-1">
                  <Typography className="mb-1 text-xs !font-medium !text-gray-600">
                    {label}:
                  </Typography>
                  <Typography className="text-xs !font-bold" color="blue-gray">
                    {options[label]}
                  </Typography>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    );
}

export default WorksCard;