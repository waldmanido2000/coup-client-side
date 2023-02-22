import "./Developer.css";
import thankYou from "../../../../Assets/thank-you.png";
import { FaCheckCircle } from 'react-icons/fa';


function Developer(): JSX.Element {
    const image = "https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.6435-9/80807821_2876949915703562_199477466845151232_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=K0I-vfy1G3AAX_3Pzh7&_nc_ht=scontent.ftlv5-1.fna&oh=00_AfAUJGFe-lBsXEBwPBn796WReR86XswhqRMKxYyh3q_PcA&oe=641D8182";
    return (
        <div className="Developer">
            <h1>About Ido Waldman</h1>
            <div className="details-grid">
                <div>
                    <h2>Contact Information</h2>
                    <ul>
                        <li>Name: Ido Waldman</li>
                        <li>Date of Birth: August 16, 1978</li>
                        <li>Marital Status: Married to Sigal</li>
                        <li>Number of Children: 2 (Chuck and Rona)</li>
                        <li>Address: Rehovot, Laskov 11/31</li>
                        <li>Cell Phone / WhatsApp: 052-6035666</li>
                        <li>Email Address: waldmanido2000@gmail.com</li>
                    </ul>
                </div>
                <div>
                    <img src={image} alt="profile picture of ido waldman" />
                </div>
            </div>
            <h2><FaCheckCircle /> Work Experience</h2>
            <ul>
                <li>2020-2022: Freelancer as SEO/SEM manager, social media manager</li>
                <li>2013-2020: Hamiktzoanim, as SEO specialist / data analyst / SEM manager</li>
                <li>2008-2013: Zap-group, as a web developer / SEO project manager / SEO specialist</li>
            </ul>
            <h2><FaCheckCircle /> Skills</h2>
            <div className="skills-grid">
                <div>
                    <h3>Programming and development</h3>
                    <ul>
                        <li>App development with <span>React.js</span></li>
                        <li>Web development with Vanilla stack (<span>HTML</span>, <span>JS</span> and <span>CSS</span>)</li>
                        <li>Server-side development with <span>Java</span></li>
                        <li>Server-side development familiarity with <span>Python</span></li>
                        <li>Server-side development with <span>Spring Boot</span></li>
                        <li>Database knowledge of <span>MySQL</span>, <span>MongoDb</span>, <span>Redis</span>, <span>H2</span></li>
                    </ul>
                </div>
                <div>
                    <h3>Programming frameworks and environments</h3>
                    <ul>
                        <li><span>IntelliJ IDEA</span></li>
                        <li><span>PyCharm</span></li>
                        <li><span>VS Code</span></li>
                        <li><span>GitHub</span></li>
                        <li><span>Docker Desktop</span></li>
                    </ul>
                </div>
                <div>
                    <h3>Google tools</h3>
                    <ul>
                        <li><span>Google Analytics</span></li>
                        <li><span>Search Console</span></li>
                        <li><span>Google Ads</span></li>
                        <li><span>Data Studio</span></li>

                    </ul>
                </div>
                <div>
                    <h3>Other skills</h3>
                    <ul>
                        <li>significant experience with using <span>ChatGPT Plus</span> to better my code writing and acquiring new skills</li>
                        <li><span>Facebook tools</span> for groups and pages</li>
                        <li><span>Youtube channel</span> management</li>
                        <li>Site management with CMS such as <span>Wordpress</span>, <span>Wix</span>, <span>Drupal</span>, and <span>Weebly</span></li>
                        <li>Google apps such as <span>Sheets</span>, <span>Docs</span>, <span>Slides</span>, <span>Drive</span> and more</li>
                        <li>Microsoft apps such as <span>Excel</span>, <span>Word</span>, <span>PowerPoint</span></li>
                    </ul>
                </div>
            </div>
            <h2><FaCheckCircle /> Education</h2>
            <ul>
                <li>Graduated with excellence a fullstack development course in John Brice academy (2022-2023)</li>
                <li>Graduated novice and advanced course for python developers in Campus.il (2021-2022)</li>
                <li>Graduated with excellence a 1-year course for webmasters in John Brice academy (2009)</li>
                <li>Got 721 points on my PET (2003)</li>
                <li>I got my GED from Aharon Katzir high school in Rehovot, class of 1996, with math, biology, English and chemistry as main classes.</li>
            </ul>
            <h2><FaCheckCircle /> Languages</h2>
            <ul>
                <li>Hebrew: Native Speaker</li>
                <li>English: Very Good</li>
            </ul>

            <h2><FaCheckCircle /> Military Service</h2>
            <p>I am a Major in the reserves commando brigade, acting as the main intelligence assessment officer for the last 5 years.
                After being the intelligence officer of a battalion in the same brigade for 15 years. While serving my mandatory service,
                I was in the infantry (Givati) and after my training, I joined officer training school, graduated as an intelligence
                officer and later I came back as an instructor in the same school (bahad 15).</p>
            <h2><FaCheckCircle /> Life Experience and Hobbies</h2>
            <p>I practice volleyball for 12 years, run several successful niche Facebook communities, I love to educate myself on various
                fields, via online courses, books and workshops.</p>
            <div className="personal-grid">
                <div>
                    <h2><FaCheckCircle /> On a Personal Note</h2>
                    <p>I am looking for a place suitable for me to grow in, I bring passion and an eye for details, every job I had was a place
                        I saw myself as a part of a team for the long run and I hope to find the same with you. I am not afraid of learning new
                        things (actually, it’s one of my favorite things to do), I have good ethics and I care about what I do.</p>
                </div>
                <div>
                    <img src={thankYou} alt="a picture of Ido Waldman on a lecture" />
                </div>
            </div>
        </div>
    );
}

export default Developer;
