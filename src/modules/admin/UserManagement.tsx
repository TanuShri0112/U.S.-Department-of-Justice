import { useState } from "react";
import { Section } from "@/components/common/Section";
import { StatusPill } from "@/components/common/StatusPill";
import { mockUsers } from "@/mock/data";
import { Role } from "@/types/platform";

export const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "learner" as Role });

  const addUser = () => {
    setUsers((prev) => [...prev, { ...newUser, id: `u-${prev.length + 1}` }]);
    setNewUser({ name: "", email: "", role: "learner" });
  };

  return (
    <div className="space-y-4">
      <Section
        title="User management"
        description="Add/Edit users, bulk upload, role assignment"
        actions={<button className="rounded-lg border px-3 py-2 text-sm font-semibold text-[#0033A1] hover:bg-blue-50 focus-ring">Bulk upload (mock)</button>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Name</label>
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm focus-ring"
              value={newUser.name}
              onChange={(e) => setNewUser((p) => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm focus-ring"
              value={newUser.email}
              onChange={(e) => setNewUser((p) => ({ ...p, email: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Role</label>
            <select
              className="w-full rounded-lg border px-3 py-2 text-sm focus-ring"
              value={newUser.role}
              onChange={(e) => setNewUser((p) => ({ ...p, role: e.target.value as Role }))}
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="learner">Learner</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={addUser} className="w-full rounded-lg bg-[#0033A1] px-4 py-2 text-white font-semibold shadow focus-ring">
              Add user
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Role</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-slate-900">{user.name}</td>
                  <td className="px-4 py-3 text-slate-600">{user.email}</td>
                  <td className="px-4 py-3 capitalize text-slate-600">{user.role}</td>
                  <td className="px-4 py-3">
                    <StatusPill label={user.status ?? "active"} tone={user.status === "disabled" ? "danger" : "success"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
};


