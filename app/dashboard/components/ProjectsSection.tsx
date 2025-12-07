// app/dashboard/components/ProjectsSection.tsx
import ProjectCard from './ProjectCard';
import { projects } from './utils';

export default function ProjectsSection() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Active Projects</h3>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}