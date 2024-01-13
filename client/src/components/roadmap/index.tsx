import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { FaRegClock } from "react-icons/fa6";
import Typography from "@mui/material/Typography";
import { roadmapItems } from "@/services/orientation/orientationHelper";

interface Props {
  data: roadmapItems[];
}
const Roadmap: React.FC<Props> = (props) => {
  const { data } = props;
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent></TimelineOppositeContent>
      </TimelineItem>
      {data.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            className="text-[#2885fd]"
          >
            {item.time}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            {index % 2 === 0 ? (
              <TimelineDot color="primary" variant="outlined">
                <FaRegClock size={28} />
              </TimelineDot>
            ) : (
              <TimelineDot color="primary">
                <FaRegClock size={28} />
              </TimelineDot>
            )}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography
              className="text-[#2885fd]"
              variant="h6"
              component="span"
            >
              {item.path}
            </Typography>
            <Typography className="text-[#2885fd] italic">
              {item.content}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
export default Roadmap;
