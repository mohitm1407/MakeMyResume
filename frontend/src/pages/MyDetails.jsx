import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import '../details.css'

const emptyPersonal = {
  full_name: '',
  email: '',
  phone: '',
  location: '',
  github_url: '',
  linkedin_url: '',
  website_url: '',
}

const emptyProfessional = {
  company_name: '',
  job_title: '',
  location: '',
  start_date: '',
  end_date: '',
  description: '',
}

const emptyEducation = {
  school_name: '',
  degree: '',
  location: '',
  field_of_study: '',
  start_date: '',
  end_date: '',
  grade: '',
}

const emptyProject = {
  project_name: '',
  project_description: '',
  project_url: '',
  project_start_date: '',
  project_end_date: '',
  project_technologies: '',
}

function MyDetails() {
  const [activeTab, setActiveTab] = useState('personal')
  const [savedMsg, setSavedMsg] = useState('')

  const [personal, setPersonal] = useState({ ...emptyPersonal })
  const [professionalList, setProfessionalList] = useState([{ ...emptyProfessional }])
  const [educationList, setEducationList] = useState([{ ...emptyEducation }])
  const [projectList, setProjectList] = useState([{ ...emptyProject }])

  const tabs = useMemo(
    () => [
      { id: 'personal', label: 'Personal' },
      { id: 'professional', label: 'Professional' },
      { id: 'education', label: 'Education' },
      { id: 'projects', label: 'Projects' },
    ],
    [],
  )
  const counts = {
    personal: 1,
    professional: professionalList.length,
    education: educationList.length,
    projects: projectList.length,
  }

  const showSaved = () => {
    setSavedMsg('Saved locally. Backend wiring can be added next.')
    setTimeout(() => setSavedMsg(''), 2000)
  }

  const onAddRow = (section) => {
    if (section === 'professional') setProfessionalList((l) => [...l, { ...emptyProfessional }])
    if (section === 'education') setEducationList((l) => [...l, { ...emptyEducation }])
    if (section === 'projects') setProjectList((l) => [...l, { ...emptyProject }])
  }

  const onRemoveRow = (section, idx) => {
    if (section === 'professional')
      setProfessionalList((l) => l.filter((_, i) => i !== idx))
    if (section === 'education')
      setEducationList((l) => l.filter((_, i) => i !== idx))
    if (section === 'projects')
      setProjectList((l) => l.filter((_, i) => i !== idx))
  }

  return (
    <div className="details-layout">
      <header className="details-navbar">
        <div className="details-nav-content">
          <div className="details-brand">
            <span className="details-logo">MMR</span>
            <span className="details-title">MakeMyResume</span>
          </div>
          <nav className="details-links">
            <Link to="/home">Home</Link>
            <span className="details-link-active">My Details</span>
            <Link to="/login">Logout</Link>
          </nav>
        </div>
      </header>

      <main className="details-main">
        <div className="details-card">
          <div className="details-header">
            <h1>My Details</h1>
            <p>Fill in the sections below to build your resume</p>
          </div>

          {/* Mobile tabs (visible on small screens) */}
          <div className="details-tabs">
            {tabs.map((t) => (
              <button
                key={t.id}
                className={activeTab === t.id ? 'tab active' : 'tab'}
                onClick={() => setActiveTab(t.id)}
                type="button"
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="details-shell">
            {/* Sidebar tabs (visible on desktop) */}
            <aside className="details-sidebar">
              <div className="side-group">
                {tabs.map((t) => (
                  <button
                    key={`side-${t.id}`}
                    className={activeTab === t.id ? 'side-tab active' : 'side-tab'}
                    onClick={() => setActiveTab(t.id)}
                    type="button"
                  >
                    <span className="side-tab-label">{t.label}</span>
                    <span className="side-tab-count">{counts[t.id]}</span>
                  </button>
                ))}
              </div>
              <div className="sidebar-help">
                Tip: Add multiple roles, schools, and projects. Keep bullet points concise.
              </div>
            </aside>

            <section className="details-content">
              {activeTab === 'personal' && (
                <section className="details-section">
              <div className="grid two">
                <div className="field">
                  <label htmlFor="full_name">Full name</label>
                  <input
                    id="full_name"
                    value={personal.full_name}
                    onChange={(e) => setPersonal({ ...personal, full_name: e.target.value })}
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={personal.email}
                    onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                    placeholder="jane@example.com"
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    value={personal.phone}
                    onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                    placeholder="+1 555 000 1234"
                  />
                </div>
                <div className="field">
                  <label htmlFor="location">Location</label>
                  <input
                    id="location"
                    value={personal.location}
                    onChange={(e) => setPersonal({ ...personal, location: e.target.value })}
                    placeholder="City, Country"
                  />
                </div>
                <div className="field">
                  <label htmlFor="github_url">GitHub URL</label>
                  <input
                    id="github_url"
                    value={personal.github_url}
                    onChange={(e) => setPersonal({ ...personal, github_url: e.target.value })}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="field">
                  <label htmlFor="linkedin_url">LinkedIn URL</label>
                  <input
                    id="linkedin_url"
                    value={personal.linkedin_url}
                    onChange={(e) => setPersonal({ ...personal, linkedin_url: e.target.value })}
                    placeholder="https://www.linkedin.com/in/username"
                  />
                </div>
                <div className="field">
                  <label htmlFor="website_url">Website URL</label>
                  <input
                    id="website_url"
                    value={personal.website_url}
                    onChange={(e) => setPersonal({ ...personal, website_url: e.target.value })}
                    placeholder="https://your-portfolio.com"
                  />
                </div>
              </div>
              <div className="actions">
                <button className="btn primary" type="button" onClick={showSaved}>
                  Save personal details
                </button>
              </div>
            </section>
              )}

              {activeTab === 'professional' && (
                <section className="details-section">
              {professionalList.map((item, idx) => (
                <div className="repeat-card" key={`prof-${idx}`}>
                  <div className="grid two">
                    <div className="field">
                      <label>Company name</label>
                      <input
                        value={item.company_name}
                        onChange={(e) => {
                          const copy = [...professionalList]
                          copy[idx] = { ...item, company_name: e.target.value }
                          setProfessionalList(copy)
                        }}
                        placeholder="Company Inc."
                      />
                    </div>
                    <div className="field">
                      <label>Job title</label>
                      <input
                        value={item.job_title}
                        onChange={(e) => {
                          const copy = [...professionalList]
                          copy[idx] = { ...item, job_title: e.target.value }
                          setProfessionalList(copy)
                        }}
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div className="field">
                      <label>Location</label>
                      <input
                        value={item.location}
                        onChange={(e) => {
                          const copy = [...professionalList]
                          copy[idx] = { ...item, location: e.target.value }
                          setProfessionalList(copy)
                        }}
                        placeholder="City, Country"
                      />
                    </div>
                    <div className="field">
                      <label>Start date</label>
                      <input
                        type="date"
                        value={item.start_date}
                        onChange={(e) => {
                          const copy = [...professionalList]
                          copy[idx] = { ...item, start_date: e.target.value }
                          setProfessionalList(copy)
                        }}
                      />
                    </div>
                    <div className="field">
                      <label>End date</label>
                      <input
                        type="date"
                        value={item.end_date}
                        onChange={(e) => {
                          const copy = [...professionalList]
                          copy[idx] = { ...item, end_date: e.target.value }
                          setProfessionalList(copy)
                        }}
                      />
                    </div>
                    <div className="field span-2">
                      <label>Description</label>
                      <textarea
                        rows={4}
                        value={item.description}
                        onChange={(e) => {
                          const copy = [...professionalList]
                          copy[idx] = { ...item, description: e.target.value }
                          setProfessionalList(copy)
                        }}
                        placeholder="Key achievements, responsibilities, impact..."
                      />
                    </div>
                  </div>
                  <div className="repeat-actions">
                    <button className="btn ghost" type="button" onClick={() => onRemoveRow('professional', idx)} disabled={professionalList.length === 1}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="repeat-controls">
                <button className="btn" type="button" onClick={() => onAddRow('professional')}>+ Add another</button>
              </div>
              <div className="actions">
                <button className="btn primary" type="button" onClick={showSaved}>
                  Save professional details
                </button>
              </div>
            </section>
              )}

              {activeTab === 'education' && (
                <section className="details-section">
              {educationList.map((item, idx) => (
                <div className="repeat-card" key={`edu-${idx}`}>
                  <div className="grid two">
                    <div className="field">
                      <label>School name</label>
                      <input
                        value={item.school_name}
                        onChange={(e) => {
                          const copy = [...educationList]
                          copy[idx] = { ...item, school_name: e.target.value }
                          setEducationList(copy)
                        }}
                        placeholder="University / School"
                      />
                    </div>
                    <div className="field">
                      <label>Degree</label>
                      <input
                        value={item.degree}
                        onChange={(e) => {
                          const copy = [...educationList]
                          copy[idx] = { ...item, degree: e.target.value }
                          setEducationList(copy)
                        }}
                        placeholder="B.Tech / M.Sc / ..."
                      />
                    </div>
                    <div className="field">
                      <label>Field of study</label>
                      <input
                        value={item.field_of_study}
                        onChange={(e) => {
                          const copy = [...educationList]
                          copy[idx] = { ...item, field_of_study: e.target.value }
                          setEducationList(copy)
                        }}
                        placeholder="Computer Science"
                      />
                    </div>
                    <div className="field">
                      <label>Location</label>
                      <input
                        value={item.location}
                        onChange={(e) => {
                          const copy = [...educationList]
                          copy[idx] = { ...item, location: e.target.value }
                          setEducationList(copy)
                        }}
                        placeholder="City, Country"
                      />
                    </div>
                    <div className="field">
                      <label>Start date</label>
                      <input
                        type="date"
                        value={item.start_date}
                        onChange={(e) => {
                          const copy = [...educationList]
                          copy[idx] = { ...item, start_date: e.target.value }
                          setEducationList(copy)
                        }}
                      />
                    </div>
                    <div className="field">
                      <label>End date</label>
                      <input
                        type="date"
                        value={item.end_date}
                        onChange={(e) => {
                          const copy = [...educationList]
                          copy[idx] = { ...item, end_date: e.target.value }
                          setEducationList(copy)
                        }}
                      />
                    </div>
                    <div className="field">
                      <label>Grade (optional)</label>
                      <input
                        value={item.grade}
                        onChange={(e) => {
                          const copy = [...educationList]
                          copy[idx] = { ...item, grade: e.target.value }
                          setEducationList(copy)
                        }}
                        placeholder="GPA / Percentage"
                      />
                    </div>
                  </div>
                  <div className="repeat-actions">
                    <button className="btn ghost" type="button" onClick={() => onRemoveRow('education', idx)} disabled={educationList.length === 1}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="repeat-controls">
                <button className="btn" type="button" onClick={() => onAddRow('education')}>+ Add another</button>
              </div>
              <div className="actions">
                <button className="btn primary" type="button" onClick={showSaved}>
                  Save education details
                </button>
              </div>
            </section>
              )}

              {activeTab === 'projects' && (
                <section className="details-section">
              {projectList.map((item, idx) => (
                <div className="repeat-card" key={`proj-${idx}`}>
                  <div className="grid two">
                    <div className="field">
                      <label>Project name</label>
                      <input
                        value={item.project_name}
                        onChange={(e) => {
                          const copy = [...projectList]
                          copy[idx] = { ...item, project_name: e.target.value }
                          setProjectList(copy)
                        }}
                        placeholder="Awesome Project"
                      />
                    </div>
                    <div className="field">
                      <label>Project URL</label>
                      <input
                        value={item.project_url}
                        onChange={(e) => {
                          const copy = [...projectList]
                          copy[idx] = { ...item, project_url: e.target.value }
                          setProjectList(copy)
                        }}
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                    <div className="field">
                      <label>Start date</label>
                      <input
                        type="date"
                        value={item.project_start_date}
                        onChange={(e) => {
                          const copy = [...projectList]
                          copy[idx] = { ...item, project_start_date: e.target.value }
                          setProjectList(copy)
                        }}
                      />
                    </div>
                    <div className="field">
                      <label>End date</label>
                      <input
                        type="date"
                        value={item.project_end_date}
                        onChange={(e) => {
                          const copy = [...projectList]
                          copy[idx] = { ...item, project_end_date: e.target.value }
                          setProjectList(copy)
                        }}
                      />
                    </div>
                    <div className="field span-2">
                      <label>Technologies</label>
                      <input
                        value={item.project_technologies}
                        onChange={(e) => {
                          const copy = [...projectList]
                          copy[idx] = { ...item, project_technologies: e.target.value }
                          setProjectList(copy)
                        }}
                        placeholder="React, Django, PostgreSQL"
                      />
                    </div>
                    <div className="field span-2">
                      <label>Description</label>
                      <textarea
                        rows={4}
                        value={item.project_description}
                        onChange={(e) => {
                          const copy = [...projectList]
                          copy[idx] = { ...item, project_description: e.target.value }
                          setProjectList(copy)
                        }}
                        placeholder="What the project does, your role, and outcomes..."
                      />
                    </div>
                  </div>
                  <div className="repeat-actions">
                    <button className="btn ghost" type="button" onClick={() => onRemoveRow('projects', idx)} disabled={projectList.length === 1}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="repeat-controls">
                <button className="btn" type="button" onClick={() => onAddRow('projects')}>+ Add another</button>
              </div>
              <div className="actions">
                <button className="btn primary" type="button" onClick={showSaved}>
                  Save projects
                </button>
              </div>
            </section>
              )}
            </section>
          </div>

          {savedMsg && <div className="saved-msg">{savedMsg}</div>}
        </div>
      </main>
    </div>
  )
}

export default MyDetails


