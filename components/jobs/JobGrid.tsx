import JobCard from "./JobCard";

type Job = {
  id: number;
  url: string;
  title: string;
  company: string;
  jt: string | null;
  st: string | null;
  area: string | null;
  snippet: string | null;
  update: Date | null;
  category: string[];
};

type Props = {
  jobs: Job[];
  layout?: "list" | "grid2" | "grid3" | "grid4";
};

export default function JobGrid({ jobs, layout = "grid3" }: Props) {
  const gridClass = {
    list: "col-xl-12 col-12",
    grid2: "col-xl-6 col-lg-6 col-md-6 col-12",
    grid3: "col-xl-4 col-lg-4 col-md-6 col-12",
    grid4: "col-xl-3 col-lg-3 col-md-6 col-12",
  }[layout];

  return (
    <div className="row display-list">
      {jobs.map((job) => (
        <div key={job.id} className={gridClass}>
          <JobCard job={job} layout={layout} />
        </div>
      ))}
    </div>
  );
}