import React from "react";

export default function SampleProposal() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

        :root {
          --cream: #FAF7F2;
          --warm-white: #FFFDF9;
          --charcoal: #1C1B19;
          --charcoal-mid: #2E2D2A;
          --muted: #7A786E;
          --border: #E8E3DA;
          --gold: #B8955A;
          --gold-light: #E8D9B8;
          --success: #2F5D50;
          font-size: 14px;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: var(--cream);
          color: var(--charcoal);
          line-height: 1.6;
        }

        .proposal-wrapper {
          font-family: 'Inter', sans-serif;
          background: var(--cream);
          color: var(--charcoal);
          line-height: 1.6;
        }

        .cover {
          min-height: 100vh;
          background: var(--charcoal);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 60px;
          position: relative;
          overflow: hidden;
        }

        .cover::before {
          content: '';
          position: absolute;
          top: -80px;
          right: -80px;
          width: 420px;
          height: 420px;
          border: 1px solid rgba(184,149,90,0.18);
          border-radius: 50%;
        }

        .cover::after {
          content: '';
          position: absolute;
          bottom: -120px;
          left: -60px;
          width: 300px;
          height: 300px;
          border: 1px solid rgba(184,149,90,0.1);
          border-radius: 50%;
        }

        .cover-tag {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          border: 1px solid rgba(184,149,90,0.3);
          display: inline-block;
          padding: 6px 14px;
          border-radius: 2px;
          position: relative;
          z-index: 1;
          width: fit-content;
        }

        .cover-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 0;
          position: relative;
          z-index: 1;
        }

        .cover-eyebrow {
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 18px;
        }

        .cover-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(52px, 8vw, 88px);
          line-height: 1.0;
          color: #FAF7F2;
          margin-bottom: 24px;
        }

        .cover-title em {
          font-style: italic;
          color: var(--gold);
        }

        .cover-subtitle {
          font-size: 15px;
          color: rgba(250,247,242,0.45);
          max-width: 500px;
          line-height: 1.75;
        }

        .cover-meta {
          display: flex;
          gap: 40px;
          border-top: 1px solid rgba(250,247,242,0.08);
          padding-top: 24px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .cover-meta-item label {
          display: block;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(250,247,242,0.28);
          margin-bottom: 4px;
        }

        .cover-meta-item span {
          font-size: 13px;
          color: rgba(250,247,242,0.65);
        }

        .section {
          padding: 80px 60px;
          border-bottom: 1px solid var(--border);
        }

        .section-alt {
          background: var(--warm-white);
        }

        .section-eyebrow {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 10px;
        }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(32px, 4vw, 48px);
          line-height: 1.15;
          margin-bottom: 14px;
        }

        .section-lead {
          font-size: 15px;
          color: var(--muted);
          max-width: 700px;
          line-height: 1.75;
          margin-bottom: 48px;
        }

        .strategy-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .strategy-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 26px;
        }

        .strategy-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 400;
          margin-bottom: 12px;
        }

        .strategy-card p {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.8;
        }

        .packages-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          align-items: start;
        }

        .pkg {
          background: white;
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .pkg.featured {
          border: 1px solid rgba(184,149,90,0.4);
          box-shadow: 0 10px 40px rgba(28,27,25,0.06);
        }

        .pkg.featured::before {
          content: 'Recommended';
          position: absolute;
          top: 18px;
          right: 18px;
          background: var(--gold);
          color: var(--charcoal);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 10px;
          border-radius: 2px;
          font-weight: 700;
        }

        .pkg-head {
          padding: 32px 28px 24px;
          background: var(--warm-white);
          border-bottom: 1px solid var(--border);
        }

        .pkg-tier {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 10px;
        }

        .pkg-name {
          font-family: 'Inter', sans-serif;
          font-size: 34px;
          font-weight: 300;
          margin-bottom: 8px;
        }

        .pkg-price {
          font-size: 30px;
          font-weight: 400;
          margin-bottom: 10px;
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        .pkg-price .current-price {
          font-size: 24px;
          color: var(--charcoal);
          font-weight: 600;
        }

        .pkg-price .old-price {
          font-size: 18px;
          color: var(--muted);
          text-decoration: line-through;
          font-weight: 400;
        }

        .pkg-desc {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.75;
          max-width: 520px;
        }

        .pkg-body {
          padding: 28px;
        }

        .block {
          margin-bottom: 30px;
        }

        .block:last-child {
          margin-bottom: 0;
        }

        .block-title {
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 14px;
          font-weight: 700;
        }

        .mini-card {
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 18px 18px 14px;
          margin-bottom: 14px;
          background: #fff;
        }

        .mini-card:last-child {
          margin-bottom: 0;
        }

        .mini-card h4 {
          font-family: 'Inter', sans-serif;
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .mini-card p {
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 10px;
          line-height: 1.7;
        }

        .sl {
          list-style: none;
        }

        .sl li {
          font-size: 13px;
          color: var(--muted);
          padding: 6px 0;
          border-bottom: 1px solid var(--cream);
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .sl li:last-child {
          border-bottom: none;
        }

        .sl li::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--gold);
          margin-top: 7px;
          flex-shrink: 0;
        }

        .sl li strong {
          color: var(--charcoal);
          font-weight: 500;
        }

        .timeline {
          list-style: none;
          position: relative;
          padding-left: 28px;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 5px;
          top: 8px;
          bottom: 8px;
          width: 1px;
          background: var(--border);
        }

        .timeline li {
          position: relative;
          padding: 0 0 30px 18px;
        }

        .timeline li::before {
          content: '';
          position: absolute;
          left: -23px;
          top: 6px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: white;
          border: 2px solid var(--gold);
        }

        .tl-week {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 5px;
        }

        .tl-title {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .tl-desc {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.65;
        }

        @media (max-width: 980px) {
          .packages-grid,
          .strategy-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .cover {
            padding: 36px 28px;
          }

          .section {
            padding: 52px 28px;
          }

          .cover-meta {
            gap: 24px;
          }
        }
      `}</style>

      <div className="proposal-wrapper">
        {/* COVER */}
        <div className="cover">
          <div className="cover-tag">Website Proposal · 2026</div>

          <div className="cover-main">
            <p className="cover-eyebrow">Photography Portfolio Website</p>
            <h1 className="cover-title">
              Showcase Your Work.
              <br />
              <em>Convert More Clients.</em>
            </h1>
            <p className="cover-subtitle">
              A proposal to design and build a clean, premium, and
              conversion-focused photography website that helps you
              professionally present your work and make it easier for potential
              clients to inquire and book.
            </p>
          </div>

          <div className="cover-meta">
            <div className="cover-meta-item">
              <label>Prepared for</label>
              <span>Photography Studio Client</span>
            </div>
            <div className="cover-meta-item">
              <label>Prepared by</label>
              <span>Your Web Design Studio</span>
            </div>
            <div className="cover-meta-item">
              <label>Date</label>
              <span>April 2026</span>
            </div>
            <div className="cover-meta-item">
              <label>Focus</label>
              <span>Portfolio · Inquiries · Bookings</span>
            </div>
          </div>
        </div>

        {/* PROJECT OBJECTIVE */}
        <div className="section">
          <p className="section-eyebrow">01 — Project Objective</p>
          <h2 className="section-title">What This Website Is Designed To Do</h2>
          <p className="section-lead">
            This website is being proposed as both a{" "}
            <strong>portfolio platform</strong> and a{" "}
            <strong>client conversion tool</strong>. The primary goal is to
            showcase your photography in a polished and professional way, while
            also creating a simple path for potential clients to make inquiries
            and submit booking requests.
          </p>

          <div className="strategy-grid">
            <div className="strategy-card">
              <h3>Portfolio-First Experience</h3>
              <p>
                Your work is the strongest selling point, so the website will be
                designed to put your photography at the center of the user
                experience with clean layouts, curated categories, and premium
                presentation.
              </p>
            </div>
            <div className="strategy-card">
              <h3>Conversion-Focused Structure</h3>
              <p>
                Beyond aesthetics, the website will guide visitors toward action
                through clear calls-to-action, trust-building sections, and a
                dedicated bookings page that reduces friction in the inquiry
                process.
              </p>
            </div>
          </div>
        </div>

        {/* PACKAGE OPTIONS */}
        <div className="section section-alt">
          <p className="section-eyebrow">02 — Website Proposal Options</p>
          <h2 className="section-title">Choose the Best Fit for Your Brand</h2>
          <p className="section-lead">
            Both options are designed to help you present your work
            professionally online. The difference is in how far we go with the
            user journey, conversion flow, and overall experience.
          </p>

          <div className="packages-grid">
            {/* BASIC */}
            <div className="pkg">
              <div className="pkg-head">
                <p className="pkg-tier">Option 1</p>
                <h3 className="pkg-name">Basic Package</h3>
                <p className="pkg-price">
                  <span className="current-price">₦100,000</span>
                  <span className="old-price">₦150,000</span>
                </p>
                <p className="pkg-desc">
                  A clean and professional photography portfolio website built
                  to establish your online presence, showcase your work, and
                  make it easy for clients to reach out or submit booking
                  requests.
                </p>
              </div>

              <div className="pkg-body">
                <div className="block">
                  <p className="block-title">Number of Pages — 4 Pages</p>

                  <div className="mini-card">
                    <h4>Home</h4>
                    <p>
                      Main landing page designed to introduce the brand and
                      guide visitors through the most important content.
                    </p>
                    <ul className="sl">
                      <li>Hero section</li>
                      <li>Short About section</li>
                      <li>
                        Featured work categories:{" "}
                        <strong>Engagements, Weddings, Portraits</strong>
                      </li>
                      <li>Testimonials</li>
                      <li>FAQ section</li>
                      <li>Call-to-action to contact or book</li>
                    </ul>
                  </div>

                  <div className="mini-card">
                    <h4>Portfolio</h4>
                    <p>
                      A dedicated gallery page focused on visually showcasing
                      your best work.
                    </p>
                    <ul className="sl">
                      <li>Gallery layout</li>
                      <li>
                        Work organized under{" "}
                        <strong>Engagements, Weddings, Portraits</strong>
                      </li>
                      <li>Clean browsing experience</li>
                      <li>Click-to-view larger images</li>
                    </ul>
                  </div>

                  <div className="mini-card">
                    <h4>Bookings</h4>
                    <p>
                      A simple inquiry-based booking page that helps clients
                      submit session requests.
                    </p>
                    <ul className="sl">
                      <li>Booking inquiry form</li>
                      <li>Session/event type selection</li>
                      <li>Preferred date field</li>
                      <li>Additional notes/details section</li>
                    </ul>
                  </div>

                  <div className="mini-card">
                    <h4>Contact</h4>
                    <p>
                      A direct communication page for inquiries and general
                      contact.
                    </p>
                    <ul className="sl">
                      <li>Contact form</li>
                      <li>Email / phone details</li>
                      <li>Social media links</li>
                      <li>Optional WhatsApp button</li>
                    </ul>
                  </div>
                </div>

                <div className="block">
                  <p className="block-title">Domain Registration</p>
                  <ul className="sl">
                    <li>Assistance with choosing a suitable domain name</li>
                    <li>Domain registration support and setup</li>
                    <li>
                      <strong>Domain cost billed separately</strong>
                    </li>
                    <li>
                      Estimated domain cost:{" "}
                      <strong>₦15,000 – ₦30,000/year</strong>
                    </li>
                  </ul>
                </div>

                <div className="block">
                  <p className="block-title">Deliverables</p>
                  <ul className="sl">
                    <li>Custom-designed 4-page website</li>
                    <li>Mobile responsive design</li>
                    <li>Portfolio gallery setup</li>
                    <li>Contact and booking forms</li>
                    <li>Basic SEO setup</li>
                    <li>Social media integration</li>
                    <li>Website deployment / launch</li>
                    <li>2 rounds of revisions</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* PROFESSIONAL */}
            <div className="pkg featured">
              <div className="pkg-head">
                <p className="pkg-tier">Option 2</p>
                <h3 className="pkg-name">Professional Package</h3>
                <p className="pkg-price">
                  <span className="current-price">₦150,000</span>
                  <span className="old-price">₦200,000</span>
                </p>
                <p className="pkg-desc">
                  A more complete and conversion-focused website designed not
                  just to showcase your work, but to better guide visitors
                  toward trust, inquiries, and bookings.
                </p>
              </div>

              <div className="pkg-body">
                <div className="block">
                  <p className="block-title">Number of Pages — 5 Pages</p>

                  <div className="mini-card">
                    <h4>Home</h4>
                    <p>
                      A more refined homepage designed to present the brand and
                      encourage user action.
                    </p>
                    <ul className="sl">
                      <li>Hero section</li>
                      <li>About / brand introduction</li>
                      <li>
                        Featured work categories:{" "}
                        <strong>Engagements, Weddings, Portraits</strong>
                      </li>
                      <li>Testimonials</li>
                      <li>FAQ section</li>
                      <li>Strong booking call-to-action</li>
                    </ul>
                  </div>

                  <div className="mini-card">
                    <h4>Portfolio</h4>
                    <p>
                      A more polished and engaging gallery experience with
                      better visual presentation.
                    </p>
                    <ul className="sl">
                      <li>Categorized portfolio layout</li>
                      <li>Engagements / Weddings / Portraits</li>
                      <li>Enhanced browsing flow</li>
                      <li>Lightbox image viewing experience</li>
                    </ul>
                  </div>

                  <div className="mini-card">
                    <h4>Bookings</h4>
                    <p>
                      A more conversion-friendly booking page designed to reduce
                      friction and encourage inquiries.
                    </p>
                    <ul className="sl">
                      <li>Booking request form</li>
                      <li>Session/event type selection</li>
                      <li>Calendar/availability structure</li>
                      <li>Date selection and booking details form</li>
                    </ul>
                  </div>

                  <div className="mini-card">
                    <h4>Contact</h4>
                    <p>
                      A stronger inquiry page for users who want to reach out
                      directly.
                    </p>
                    <ul className="sl">
                      <li>Contact form</li>
                      <li>Email / phone / social details</li>
                      <li>WhatsApp integration</li>
                      <li>Quick access to booking page</li>
                    </ul>
                  </div>

                  <div className="mini-card">
                    <h4>Experience / Why Book Me</h4>
                    <p>
                      A standout trust-building page designed to improve
                      conversion and help potential clients feel more confident
                      booking.
                    </p>
                    <ul className="sl">
                      <li>What it’s like to work with you</li>
                      <li>Your process from inquiry to delivery</li>
                      <li>Why clients choose your brand</li>
                      <li>What to expect after booking</li>
                    </ul>
                  </div>
                </div>

                <div className="block">
                  <p className="block-title">Domain Registration</p>
                  <ul className="sl">
                    <li>Assistance with choosing a suitable domain name</li>
                    <li>Domain registration support and setup</li>
                    <li>
                      <strong>Domain cost billed separately</strong>
                    </li>
                    <li>
                      Estimated domain cost:{" "}
                      <strong>₦15,000 – ₦30,000/year</strong>
                    </li>
                  </ul>
                </div>

                <div className="block">
                  <p className="block-title">Deliverables</p>
                  <ul className="sl">
                    <li>Custom-designed 5-page website</li>
                    <li>Mobile responsive design</li>
                    <li>Portfolio gallery setup</li>
                    <li>Enhanced booking page</li>
                    <li>Contact and inquiry forms</li>
                    <li>Light animations / transitions</li>
                    <li>Basic SEO setup</li>
                    <li>Social media integration</li>
                    <li>Website deployment / launch</li>
                    <li>3 rounds of revisions</li>
                    <li>Post-launch support period</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="section section-alt">
          <p className="section-eyebrow">03 — Timeline</p>
          <h2 className="section-title">
            Estimated Delivery Timeline - 2 Weeks
          </h2>
          <p className="section-lead">
            The project can be delivered in a focused and collaborative
            process, depending on content availability and feedback speed.
          </p>

          <ul className="timeline">
            <li>
              <p className="tl-week">Phase 1</p>
              <h4 className="tl-title">Discovery & Planning</h4>
              <p className="tl-desc">
                Review project goals, gather content, confirm structure, and
                align on the website direction.
              </p>
            </li>
            <li>
              <p className="tl-week">Phase 2</p>
              <h4 className="tl-title">Design & Layout</h4>
              <p className="tl-desc">
                Create the visual layout and page structure for approval before
                full implementation.
              </p>
            </li>
            <li>
              <p className="tl-week">Phase 3</p>
              <h4 className="tl-title">Development & Content Setup</h4>
              <p className="tl-desc">
                Build the website, integrate forms, structure the portfolio, and
                prepare all pages for launch.
              </p>
            </li>
            <li>
              <p className="tl-week">Phase 4</p>
              <h4 className="tl-title">Testing, Revisions & Launch</h4>
              <p className="tl-desc">
                Final review, refinements, and deployment of the completed
                website.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}