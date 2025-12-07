// app/dashboard/components/ProjectCard.tsx
import { formatDate, getStatusColor } from './utils';
import { Project } from './types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-gray-900">{project.name}</h4>
          <p className="text-sm text-gray-500 mt-1">
            Due {formatDate(project.deadline)} • Team: {project.team}
          </p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">
            Progress: {project.progress}%
          </span>
          <span className="text-sm text-gray-500">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              project.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}