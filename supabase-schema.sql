-- ============================================================
-- SchoolHub Dashboard — Supabase SQL Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- ========================
-- 1. TEACHERS
-- ========================
CREATE TABLE IF NOT EXISTS teachers (
    id              BIGSERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    email           TEXT UNIQUE NOT NULL,
    teacher_id      TEXT UNIQUE NOT NULL,
    subjects        TEXT[] DEFAULT '{}',
    classes         TEXT[] DEFAULT '{}',
    phone           TEXT,
    address         TEXT,
    img             TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- 2. STUDENTS
-- ========================
CREATE TABLE IF NOT EXISTS students (
    id              BIGSERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    email           TEXT UNIQUE NOT NULL,
    student_id      TEXT UNIQUE NOT NULL,
    class           TEXT,
    dob             DATE,
    phone           TEXT,
    img             TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- 3. STUDENT FEES
-- ========================
CREATE TABLE IF NOT EXISTS student_fees (
    id              BIGSERIAL PRIMARY KEY,
    student_id      TEXT REFERENCES students(student_id) ON DELETE CASCADE,
    name            TEXT NOT NULL,
    class           TEXT,
    fee             DECIMAL(10,2) NOT NULL DEFAULT 0,
    status          TEXT DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'overdue')),
    due_date        DATE,
    paid_date       DATE,
    img             TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- 4. EXPENSES
-- ========================
CREATE TABLE IF NOT EXISTS expenses (
    id              TEXT PRIMARY KEY,
    category        TEXT NOT NULL,
    expense         TEXT NOT NULL,
    quantity        TEXT,
    amount          DECIMAL(10,2) NOT NULL DEFAULT 0,
    payment_date    DATE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- 5. BOOKS (Library)
-- ========================
CREATE TABLE IF NOT EXISTS books (
    id              TEXT PRIMARY KEY,
    title           TEXT NOT NULL,
    writer          TEXT NOT NULL,
    subject         TEXT,
    class           TEXT,
    publish_date    TEXT,
    img             TEXT,
    available       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- 6. ATTENDANCE
-- ========================
CREATE TABLE IF NOT EXISTS attendance (
    id              BIGSERIAL PRIMARY KEY,
    student_id      TEXT REFERENCES students(student_id) ON DELETE CASCADE,
    student_name    TEXT NOT NULL,
    date            DATE NOT NULL,
    status          BOOLEAN,  -- true = present, false = absent, null = no school
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, date)
);

-- ========================
-- 7. ANNOUNCEMENTS
-- ========================
CREATE TABLE IF NOT EXISTS announcements (
    id              BIGSERIAL PRIMARY KEY,
    title           TEXT NOT NULL,
    description     TEXT,
    bg_color        TEXT DEFAULT 'bg-lamaSkyLight',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- 8. NOTICES
-- ========================
CREATE TABLE IF NOT EXISTS notices (
    id              BIGSERIAL PRIMARY KEY,
    title           TEXT NOT NULL,
    author          TEXT NOT NULL,
    description     TEXT,
    content         TEXT,
    tags            TEXT[] DEFAULT '{}',
    views           INTEGER DEFAULT 0,
    img             TEXT,
    avatar          TEXT,
    bg_color        TEXT DEFAULT 'bg-white',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- 9. CALENDAR EVENTS
-- ========================
CREATE TABLE IF NOT EXISTS calendar_events (
    id              BIGSERIAL PRIMARY KEY,
    title           TEXT NOT NULL,
    event_date      DATE NOT NULL,
    start_time      TIME,
    end_time        TIME,
    category        TEXT DEFAULT 'general' CHECK (category IN ('celebration', 'exam', 'fair', 'meeting', 'general')),
    color           TEXT DEFAULT 'text-sky-600',
    bg_color        TEXT DEFAULT 'bg-lamaSkyLight',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- 10. AGENDA ITEMS
-- ========================
CREATE TABLE IF NOT EXISTS agenda_items (
    id              BIGSERIAL PRIMARY KEY,
    title           TEXT NOT NULL,
    time            TIME NOT NULL,
    scope           TEXT DEFAULT 'All Grade',
    color_bg        TEXT DEFAULT 'bg-lamaSkyLight',
    color_border    TEXT DEFAULT 'border-lamaSky',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- 11. MESSAGES / CONVERSATIONS
-- ========================
CREATE TABLE IF NOT EXISTS message_threads (
    id              BIGSERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    is_group        BOOLEAN DEFAULT FALSE,
    avatar          TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
    id              BIGSERIAL PRIMARY KEY,
    thread_id       BIGINT REFERENCES message_threads(id) ON DELETE CASCADE,
    sender_name     TEXT NOT NULL,
    text            TEXT NOT NULL,
    is_me           BOOLEAN DEFAULT FALSE,
    avatar          TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- 12. DAILY SCHEDULE
-- ========================
CREATE TABLE IF NOT EXISTS daily_schedule (
    id              BIGSERIAL PRIMARY KEY,
    title           TEXT NOT NULL,
    group_name      TEXT,
    time            TIME NOT NULL,
    border_color    TEXT DEFAULT 'border-lamaSky',
    bg_color        TEXT DEFAULT 'bg-lamaSkyLight',
    schedule_date   DATE DEFAULT CURRENT_DATE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- 13. COURSES
-- ========================
CREATE TABLE IF NOT EXISTS courses (
    id              BIGSERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    code            TEXT UNIQUE NOT NULL,
    teacher         TEXT,
    class           TEXT,
    schedule        TEXT,
    duration        TEXT,
    students        INTEGER DEFAULT 0,
    status          TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    img             TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Enable RLS on all tables for Supabase security
-- ============================================================

ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE agenda_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for all tables (adjust for production!)
-- These policies allow the anon key to access all data.
-- In production, you should restrict these to authenticated users.

CREATE POLICY "Allow public access" ON teachers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access" ON students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access" ON student_fees FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access" ON expenses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access" ON books FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access" ON attendance FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access" ON announcements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access" ON notices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access" ON calendar_events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access" ON agenda_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access" ON message_threads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access" ON messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access" ON daily_schedule FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access" ON courses FOR ALL USING (true) WITH CHECK (true);


-- ============================================================
-- SEED DATA (Optional — matches your current mock data)
-- ============================================================

-- Seed Teachers
INSERT INTO teachers (name, email, teacher_id, subjects, classes, phone, address, img) VALUES
    ('Dean Guerrero', 'deanguerrero@school.edu', '1234567890', ARRAY['Math', 'Geometry'], ARRAY['1B', '2A', '3C'], '(555) 555-5555', '123 Main St, Anytown, USA', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Ophelia Castro', 'ocastro@school.edu', '9876543210', ARRAY['Physics', 'Chemistry'], ARRAY['5A', '4B', '3C'], '(555) 123-4567', '456 Elm St, Othertown, USA', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Mike Myers', 'mmyers@school.edu', '1231231234', ARRAY['English', 'Literature'], ARRAY['5A', '4B', '3C'], '(555) 555-5555', '789 Oak St, Sometown, USA', 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Hilda Silva', 'hsilva@school.edu', '4564564567', ARRAY['History', 'Civics'], ARRAY['1B', '2A', '3C'], '(555) 555-5555', '321 Pine St, Anytown, USA', 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Leonard Krasner', 'lkrasner@school.edu', '7897897890', ARRAY['Biology', 'Chemistry'], ARRAY['5A', '4B', '3C'], '(555) 555-5555', '654 Maple St, Othertown, USA', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Maria Garcia', 'mgarcia@school.edu', '1357924680', ARRAY['Spanish', 'French'], ARRAY['1B', '2A', '3C'], '(555) 555-5555', '987 Cedar St, Sometown, USA', 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('John Smith', 'jsmith@school.edu', '2468013579', ARRAY['Art', 'Design'], ARRAY['5A', '4B', '3C'], '(555) 555-5555', '159 Birch St, Anytown, USA', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Sarah Jones', 'sjones@school.edu', '3692581470', ARRAY['Music', 'Drama'], ARRAY['1B', '2A', '3C'], '(555) 555-5555', '753 Willow St, Othertown, USA', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('David Brown', 'dbrown@school.edu', '1472583690', ARRAY['PE', 'Health'], ARRAY['5A', '4B', '3C'], '(555) 555-5555', '357 Poplar St, Sometown, USA', 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Emily White', 'ewhite@school.edu', '2583691470', ARRAY['Computer Science', 'Coding'], ARRAY['1B', '2A', '3C'], '(555) 555-5555', '951 Ash St, Anytown, USA', 'https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&w=1200');

-- Seed Students
INSERT INTO students (name, email, student_id, class, dob, phone, img) VALUES
    ('Sarah Miller', 'smiller@school.edu', '2016-01-001', '10A', '2008-01-10', '(555) 101-0101', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Ethan Brown', 'ebrown@school.edu', '2014-02-050', '12', '2006-07-23', '(555) 101-0101', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Olivia', 'olivia@school.edu', '2017-03-003', '9B', '2010-09-05', '(555) 101-0101', 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Lucas Johnson', 'ljohnson@school.edu', '2015-01-004', '11A', '2009-11-02', '(555) 101-0101', 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Mia Williams', 'mwilliams@school.edu', '2016-02-005', '8B', '2007-01-19', '(555) 101-0101', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Noah Davis', 'ndavis@school.edu', '2015-03-006', '8C', '2010-05-05', '(555) 101-0101', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Emma Wilson', 'ewilson@school.edu', '2016-01-007', '7C', '2007-03-20', '(555) 101-0101', 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Liam Thompson', 'lthompson@school.edu', '2017-03-008', '10B', '2011-06-28', '(555) 101-0101', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Ava Garcia', 'agarcia@school.edu', '2016-03-009', '11A', '2009-02-15', '(555) 101-0101', 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('James Martinez', 'jmartinez@school.edu', '2018-01-010', '7B', '2008-12-12', '(555) 101-0101', 'https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&w=1200');

-- Seed Expenses
INSERT INTO expenses (id, category, expense, quantity, amount, payment_date) VALUES
    ('EX01', 'Laboratory', 'Chemicals', '100 units', 500, '2024-04-10'),
    ('EX02', 'Maintenance', 'HVAC Repair', '1 service', 3000, '2024-04-05'),
    ('EX03', 'Boarding Equipment', 'Bedding Sets', '50 sets', 2500, '2024-04-15'),
    ('EX04', 'Library', 'Books Acquisition', '200 books', 3000, '2024-04-20'),
    ('EX05', 'Sports', 'Basketball Gear', '30 items', 1500, '2024-04-12'),
    ('EX06', 'Infrastructure', 'Computers Upgrade', '10 pcs', 10000, '2024-04-25'),
    ('EX07', 'Transportation', 'Bus Maintenance', '3 buses', 4500, '2024-04-08'),
    ('EX08', 'Cafeteria', 'Kitchen Equipment Upgrade', '5 items', 8000, '2024-04-18'),
    ('EX09', 'Arts & Crafts', 'Supplies Purchase', '100 kits', 1000, '2024-04-22'),
    ('EX10', 'Maintenance', 'Painting School Building', '1 service', 7000, '2024-04-05');

-- Seed Books
INSERT INTO books (id, title, writer, subject, class, publish_date, img) VALUES
    ('2024-LIT-001-01', 'Great Expectations', 'Charles Dickens', 'English Literature', 'Class 12', '1861', 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('2024-SCI-002-01', 'Brief History of Time', 'Stephen Hawking', 'Science', 'Class 10-12', '1988', 'https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('2024-HIS-003-01', 'A People''s History of the United States', 'Howard Zinn', 'History', 'Class 11-12', '1980', 'https://images.pexels.com/photos/2099266/pexels-photo-2099266.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('2024-MATH-004-01', 'Calculus Made Easy', 'Silvanus P. Thompson', 'Mathematics', 'Class 12', '1910', 'https://images.pexels.com/photos/1329292/pexels-photo-1329292.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('2024-BIO-005-01', 'The Selfish Gene', 'Richard Dawkins', 'Biology', 'Class 11', '1976', 'https://images.pexels.com/photos/1926988/pexels-photo-1926988.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('2024-ART-006-01', 'The Story of Art', 'E.H. Gombrich', 'Art History', 'Class 9-12', '1950', 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('2024-CHE-007-01', 'Organic Chemistry as a Second Language', 'David Klein', 'Chemistry', 'Class 11-12', '2012', 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('2024-ENG-009-01', 'Elements of Style', 'William Strunk Jr.', 'English Grammar', 'Class 9-12', '1918', 'https://images.pexels.com/photos/2061528/pexels-photo-2061528.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('2024-PHY-008-01', 'Fundamentals of Physics', 'David Halliday', 'Physics', 'Class 11-12', '2013', 'https://images.pexels.com/photos/1018136/pexels-photo-1018136.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('2024-PSY-010-01', 'Thinking, Fast and Slow', 'Daniel Kahneman', 'Psychology', 'Class 12', '2011', 'https://images.pexels.com/photos/33283/stack-of-books-vintage-books-book-books.jpg?auto=compress&cs=tinysrgb&w=1200');

-- Seed Announcements
INSERT INTO announcements (title, description, bg_color) VALUES
    ('Academic Schedule Update', 'The mid-term exam schedule has been revised.', 'bg-lamaSkyLight'),
    ('Maintenance Notice', 'Server maintenance scheduled for this weekend.', 'bg-lamaPurpleLight'),
    ('New Library Books', 'Check out the new arrivals in the science section.', 'bg-lamaYellowLight');

-- Seed Notices
INSERT INTO notices (title, author, description, content, tags, views, img, avatar, bg_color) VALUES
    ('Welcome Back to School!', 'Principal Linda Carter', 'As we embark on another exciting academic year...', 'Full content here...', ARRAY['School', 'Academic', 'Student'], 1200, 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=1200', 'bg-lamaPurpleLight'),
    ('Fall Sports Tryouts Schedule', 'Coach Michael Jordan', 'Get ready to show your spirit and skills!', NULL, '{}', 890, NULL, 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1200', 'bg-white'),
    ('Library Hours Extension', 'Librarian Sarah Knox', 'Extended hours starting September 15th.', NULL, '{}', 500, NULL, 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200', 'bg-white');

-- Seed Student Fees
INSERT INTO student_fees (student_id, name, class, fee, status, img) VALUES
    ('2016-01-001', 'Sarah Miller', '10A', 4500, 'pending', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('2014-02-050', 'Ethan Brown', '12', 4500, 'paid', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('2017-03-003', 'Olivia', '9B', 4500, 'pending', 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('2015-01-004', 'Lucas Johnson', '11A', 4500, 'pending', 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('2016-02-005', 'Mia Williams', '8B', 4200, 'paid', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200');

-- Seed Courses
INSERT INTO courses (name, code, teacher, class, schedule, duration, students, status, img) VALUES
    ('Advanced Mathematics', 'MATH-301', 'Dean Guerrero', '12A', 'Mon, Wed, Fri', '1 hour', 32, 'Active', 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Physics', 'PHY-201', 'Ophelia Castro', '11A', 'Tue, Thu', '1.5 hours', 28, 'Active', 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('English Literature', 'ENG-101', 'Mike Myers', '10B', 'Mon, Wed', '1 hour', 35, 'Active', 'https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('World History', 'HIS-202', 'Hilda Silva', '11B', 'Tue, Thu, Fri', '1 hour', 30, 'Active', 'https://images.pexels.com/photos/2781814/pexels-photo-2781814.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Biology', 'BIO-301', 'Leonard Krasner', '12B', 'Mon, Wed, Fri', '1.5 hours', 26, 'Active', 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Spanish I', 'SPA-101', 'Maria Garcia', '9A', 'Tue, Thu', '1 hour', 22, 'Active', 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Art & Design', 'ART-201', 'John Smith', '10A', 'Wed, Fri', '2 hours', 18, 'Active', 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Music Theory', 'MUS-101', 'Sarah Jones', '9B', 'Mon, Thu', '1 hour', 20, 'Inactive', 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Physical Education', 'PE-100', 'David Brown', 'All', 'Mon-Fri', '45 mins', 40, 'Active', 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    ('Computer Science', 'CS-301', 'Emily White', '12A', 'Tue, Thu, Fri', '1.5 hours', 24, 'Active', 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200');
