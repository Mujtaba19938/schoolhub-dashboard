import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, RadialBarChart, RadialBar, AreaChart, Area, Defs, Stop
} from 'recharts';
import {
    LayoutDashboard, Users, UserCog, GraduationCap,
    BookOpen, CalendarDays, MessageSquare, Megaphone,
    Settings, LogOut, Search, Bell, Menu, MoreHorizontal,
    Briefcase, CheckSquare, ClipboardList, ChevronLeft, ChevronRight,
    Trophy, Target, Eye, Sliders, CircleDollarSign, FileText, MessageCircle, UserCircle, Hexagon,
    Download, Phone, Mail, Check, X, Filter, Plus, Paperclip, Send, Video, MoreVertical, Image as ImageIcon, Mic,
    FilePenLine, Trash2
} from 'lucide-react';

// --- Types ---
type AgendaItem = {
    id: number;
    time: string;
    scope: string;
    title: string;
    colorBg: string;
    colorBorder: string;
};

type Announcement = {
    id: number;
    title: string;
    time: string;
    description: string;
    bg: string;
};

type Message = {
    id: number;
    name: string;
    time: string;
    message: string;
    unread: number;
    img: string;
};

type Activity = {
    id: number;
    title: string;
    desc: string;
    icon: React.ReactNode;
    bg: string;
};

type Notice = {
    id: number;
    title: string;
    date: string;
    author: string;
    role: string;
    views: number;
    img: string;
};

type StudentFee = {
    id: number;
    name: string;
    studentId: string;
    class: string;
    fee: string;
    img: string;
    selected?: boolean;
};

type Expense = {
    id: string;
    category: string;
    expense: string;
    quantity: string;
    amount: string;
    paymentDate: string;
    selected?: boolean;
};

type Book = {
    id: string;
    title: string;
    writer: string;
    subject: string;
    class: string;
    publishDate: string;
    img: string;
    selected?: boolean;
};

type Student = {
    id: number;
    name: string;
    email: string;
    studentId: string;
    class: string;
    dob: string;
    phone: string;
    img: string;
    selected?: boolean;
};

type Teacher = {
    id: number;
    name: string;
    email: string;
    teacherId: string;
    subjects: string[];
    classes: string[];
    phone: string;
    address: string;
    img: string;
    selected?: boolean;
};

type Course = {
    id: number;
    name: string;
    code: string;
    teacher: string;
    class: string;
    schedule: string;
    duration: string;
    students: number;
    status: string;
    img: string;
    selected?: boolean;
};

// --- Mock Data ---

const attendanceData = [
    { name: 'Mon', present: 60, absent: 40 },
    { name: 'Tue', present: 70, absent: 60 },
    { name: 'Wed', present: 90, absent: 75 },
    { name: 'Thu', present: 90, absent: 75 },
    { name: 'Fri', present: 65, absent: 55 },
];

const earningsData = [
    { name: 'Jan', income: 600, expense: 400 },
    { name: 'Feb', income: 850, expense: 550 },
    { name: 'Mar', income: 550, expense: 350 },
    { name: 'Apr', income: 750, expense: 450 },
    { name: 'May', income: 650, expense: 380 },
    { name: 'Jun', income: 800, expense: 550 },
    { name: 'Jul', income: 750, expense: 450 },
    { name: 'Aug', income: 900, expense: 500 },
    { name: 'Sep', income: 600, expense: 350 },
    { name: 'Oct', income: 950, expense: 450 },
    { name: 'Nov', income: 600, expense: 400 },
    { name: 'Dec', income: 900, expense: 650 },
];

const feesCollectionData = [
    { name: 'Jan', value: 500 },
    { name: 'Feb', value: 1200 },
    { name: 'Mar', value: 800 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 2800 },
    { name: 'Jun', value: 6500 },
    { name: 'Jul', value: 5200 },
    { name: 'Aug', value: 5800 },
    { name: 'Sep', value: 4800 },
    { name: 'Oct', value: 5000 },
    { name: 'Nov', value: 4200 },
    { name: 'Dec', value: 4500 },
];

const feesTableData: StudentFee[] = [
    { id: 1, name: "Sophia Wilson", studentId: "2015-02-017", class: "11A", fee: "$4,500", img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 2, name: "Ethan Lee", studentId: "2015-01-016", class: "10B", fee: "$4,500", img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1200", selected: true },
    { id: 3, name: "Michael Brown", studentId: "2015-03-012", class: "12 AP Calculus", fee: "$4,800", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 4, name: "Ava Smith", studentId: "2015-01-019", class: "9B", fee: "$4,500", img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 5, name: "Lucas Johnson", studentId: "2015-01-004", class: "11A", fee: "$4,500", img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 6, name: "Isabella Garcia", studentId: "2015-03-015", class: "8B", fee: "$4,200", img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 7, name: "Oliver Martinez", studentId: "2015-02-014", class: "Drama Club", fee: "$4,500", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 8, name: "Hannah White", studentId: "2015-01-013", class: "7C", fee: "$4,200", img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 9, name: "Aiden Taylor", studentId: "2015-03-018", class: "Spanish I", fee: "$4,200", img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 10, name: "Emily Peterson", studentId: "2015-02-011", class: "10A", fee: "$4,500", img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200" },
];

const studentData = [
    { name: 'Total', count: 1068, fill: 'white' },
    { name: 'Girls', count: 534, fill: '#FAE27C' },
    { name: 'Boys', count: 534, fill: '#C3EBFA' },
];

const agendaItems: AgendaItem[] = [
    {
        id: 1,
        time: '08:00 am',
        scope: 'All Grade',
        title: 'Homeroom & Announcement',
        colorBg: 'bg-lamaPurpleLight',
        colorBorder: 'border-lamaPurple'
    },
    {
        id: 2,
        time: '10:00 am',
        scope: 'Grade 3-5',
        title: 'Math Review & Practice',
        colorBg: 'bg-lamaYellowLight',
        colorBorder: 'border-lamaYellow'
    },
    {
        id: 3,
        time: '10:30 am',
        scope: 'Grade 6-8',
        title: 'Science Experiment & Discussion',
        colorBg: 'bg-lamaSkyLight',
        colorBorder: 'border-lamaSky'
    },
];

const announcements: Announcement[] = [
    { id: 1, title: 'Academic Schedule Update', time: '2025-01-01', description: 'The mid-term exam schedule has been revised.', bg: 'bg-lamaSkyLight' },
    { id: 2, title: 'Maintenance Notice', time: '2025-01-02', description: 'Server maintenance scheduled for this weekend.', bg: 'bg-lamaPurpleLight' },
    { id: 3, title: 'New Library Books', time: '2025-01-03', description: 'Check out the new arrivals in the science section.', bg: 'bg-lamaYellowLight' },
];

const messagesData: Message[] = [
    {
        id: 1,
        name: "Dr. Lila Ramirez",
        time: "9:00 AM",
        message: "Please ensure the monthly attendance report is accurate before the April 30th deadline.",
        unread: 0,
        img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 2,
        name: "Ms. Heather Morris",
        time: "10:15 AM",
        message: "Don't forget the staff training on digital tools scheduled for May 5th at 3 PM in the...",
        unread: 4,
        img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 3,
        name: "Mr. Carl Jenkins",
        time: "2:00 PM",
        message: "Budget review meeting for the next fiscal year is on April 28th at 10 AM.",
        unread: 0,
        img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 4,
        name: "Officer Dan Brooks",
        time: "3:10 PM",
        message: "Review the updated security protocols effective May 1st. Familiarize yourself with...",
        unread: 2,
        img: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 5,
        name: "Ms. Tina Goldberg",
        time: "5:00 PM",
        message: "Reminder: Major IT system upgrade on May 8th from 1 PM to 4 PM.",
        unread: 6,
        img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1200"
    }
];

const activitiesData: Activity[] = [
    {
        id: 1,
        title: "Regional Robotics Champion",
        desc: "Winning robots triumph in engineering challenge",
        icon: <Trophy size={18} className="text-sky-600" />,
        bg: "bg-lamaSkyLight"
    },
    {
        id: 2,
        title: "Literacy Week Workshop",
        desc: "Students explore creative writing techniques",
        icon: <BookOpen size={18} className="text-purple-600" />,
        bg: "bg-lamaPurpleLight"
    },
    {
        id: 3,
        title: "Charity Fun Run",
        desc: "School raises funds for local shelter",
        icon: <Target size={18} className="text-yellow-600" />,
        bg: "bg-lamaYellowLight"
    }
];

const noticesData: Notice[] = [
    {
        id: 1,
        title: "Math Olympiad Competition",
        date: "04/18/2030",
        author: "Ms. Jackson",
        role: "Math Teacher",
        views: 325,
        img: "https://images.pexels.com/photos/5428012/pexels-photo-5428012.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 2,
        title: "Syllabus Update for Class 5",
        date: "04/22/2030",
        author: "Mr. Thomas",
        role: "Principal",
        views: 542,
        img: "https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 3,
        title: "School Picnic to Zoo",
        date: "05/01/2030",
        author: "Mrs. Collins",
        role: "Coordinator",
        views: 890,
        img: "https://images.pexels.com/photos/1049317/pexels-photo-1049317.jpeg?auto=compress&cs=tinysrgb&w=1200"
    }
];

const attendanceTableData = [
    { id: 1, name: "Lucas Johnson", attendance: { 8: true, 9: false, 10: true, 11: true, 12: true, 13: null, 14: null, 15: true, 16: true, 17: true, 18: true, 19: true, 20: null, 21: null } },
    { id: 2, name: "Emily Peterson", attendance: { 8: true, 9: true, 10: true, 11: true, 12: true, 13: null, 14: null, 15: true, 16: true, 17: false, 18: true, 19: true, 20: null, 21: null } },
    { id: 3, name: "Michael Brown", attendance: { 8: true, 9: true, 10: true, 11: false, 12: true, 13: null, 14: null, 15: true, 16: false, 17: true, 18: true, 19: true, 20: null, 21: null } },
    { id: 4, name: "Hannah White", attendance: { 8: true, 9: false, 10: true, 11: true, 12: true, 13: null, 14: null, 15: true, 16: true, 17: true, 18: false, 19: true, 20: null, 21: null } },
    { id: 5, name: "Oliver Martinez", attendance: { 8: true, 9: true, 10: true, 11: true, 12: true, 13: null, 14: null, 15: true, 16: true, 17: true, 18: true, 19: true, 20: null, 21: null } },
    { id: 6, name: "Isabella Garcia", attendance: { 8: true, 9: true, 10: true, 11: true, 12: false, 13: null, 14: null, 15: true, 16: true, 17: true, 18: true, 19: true, 20: null, 21: null } },
    { id: 7, name: "Ethan Lee", attendance: { 8: true, 9: true, 10: true, 11: true, 12: true, 13: null, 14: null, 15: false, 16: true, 17: false, 18: true, 19: true, 20: null, 21: null } },
    { id: 8, name: "Sophia Wilson", attendance: { 8: false, 9: true, 10: true, 11: true, 12: true, 13: null, 14: null, 15: true, 16: true, 17: true, 18: true, 19: true, 20: null, 21: null } },
    { id: 9, name: "Aiden Taylor", attendance: { 8: true, 9: true, 10: true, 11: true, 12: true, 13: null, 14: null, 15: true, 16: true, 17: true, 18: true, 19: false, 20: null, 21: null } },
    { id: 10, name: "Ava Smith", attendance: { 8: true, 9: true, 10: false, 11: true, 12: true, 13: null, 14: null, 15: true, 16: false, 17: true, 18: true, 19: true, 20: null, 21: null } },
];

const noticesList = [
    {
        id: 1,
        title: "Welcome Back to School!",
        author: "Principal Linda Carter",
        date: "August 1, 2024",
        views: "1.2k",
        desc: "As we embark on another exciting academic year, let's embrace the opportunities that lie ahead. We're thrilled to welcome new faces and reunite with returning students. Don't miss our opening assembly on August 5th!",
        content: "As we embark on another exciting academic year, let's embrace the opportunities that lie ahead. We're thrilled to welcome new faces and reunite with returning students. Don't miss our opening assembly on August 5th!\n\nAttention students! To support your exam preparation, the library will offer extended hours starting September 15th. Join us for additional study sessions and access thousands of resources. Please bring and collect over 2,000 pounds of food for local food banks.",
        tags: ["School", "Academic", "Student"],
        img: "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=1200", // Girls sitting
        selected: true,
        bg: "bg-lamaPurpleLight",
        avatar: "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 2,
        title: "Fall Sports Tryouts Schedule",
        author: "Coach Michael Jordan",
        date: "August 15, 2024",
        views: "890",
        desc: "Get ready to show your spirit and skills! Tryouts for soccer, volleyball, and football start next week. Check the gym bulletin board for exact dates and required gear. Go Eagles!",
        bg: "bg-white",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 3,
        title: "Library Hours Extension",
        author: "Librarian Sarah Knox",
        date: "September 5, 2024",
        views: "500",
        desc: "Attention students! To support your exam preparation, the library will offer extended hours starting September 15th. Join us for additional study sessions and access thousands of resources.",
        bg: "bg-white",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 4,
        title: "Flu Vaccination Clinic",
        author: "Nurse Emily White",
        date: "October 10, 2024",
        views: "300",
        desc: "Protect yourself this flu season! The school nurse's office will host a vaccination clinic on October 20th. Sign up in the main office. Vaccines are free and available to all students and staff.",
        bg: "bg-white",
        avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 5,
        title: "Annual Food Drive Kickoff",
        author: "Head of Student Council, Tom Briggs",
        date: "November 1, 2024",
        views: "450",
        desc: "Let's make a difference together! Our annual food drive starts November 5th. Please bring non-perishable food items to Room 108. Help us reach our goal to collect over 2,000 pounds of food for local food banks.",
        bg: "bg-white",
        avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
];

const calendarEvents = [
    { id: 1, title: "Teacher Pro...", date: 1, color: "text-purple-600", bgColor: "bg-lamaPurpleLight" },
    { id: 2, title: "Students Day", date: 2, color: "text-purple-600", bgColor: "bg-lamaPurpleLight" },
    { id: 3, title: "AP Calculus...", date: 2, color: "text-pink-600", bgColor: "bg-pink-100" },
    { id: 4, title: "Spring Conc...", date: 3, color: "text-sky-600", bgColor: "bg-lamaSkyLight" },
    { id: 5, title: "Science Fair...", date: 8, color: "text-sky-600", bgColor: "bg-lamaSkyLight" },
    { id: 6, title: "Teacher Mee...", date: 8, color: "text-yellow-600", bgColor: "bg-lamaYellowLight" },
    { id: 7, title: "Science Fair...", date: 9, color: "text-sky-600", bgColor: "bg-lamaSkyLight" },
    { id: 8, title: "PTA Meeting", date: 10, color: "text-yellow-600", bgColor: "bg-lamaYellowLight" },
    { id: 9, title: "Varsity Trac...", date: 15, color: "text-yellow-600", bgColor: "bg-lamaYellowLight" },
    { id: 10, title: "Junior Prom", date: 16, color: "text-sky-600", bgColor: "bg-lamaSkyLight" },
    { id: 11, title: "Board of Edu...", date: 20, color: "text-yellow-600", bgColor: "bg-lamaYellowLight" },
    { id: 12, title: "Art Exhibitio...", date: 22, color: "text-sky-600", bgColor: "bg-lamaSkyLight" },
    { id: 13, title: "Drama Club...", date: 23, color: "text-sky-600", bgColor: "bg-lamaSkyLight" },
    { id: 14, title: "PTA Meeting", date: 23, color: "text-yellow-600", bgColor: "bg-lamaYellowLight" },
    { id: 15, title: "Sophomore...", date: 27, color: "text-purple-600", bgColor: "bg-lamaPurpleLight" },
    { id: 16, title: "Art Fair & Ex...", date: 27, color: "text-sky-600", bgColor: "bg-lamaSkyLight" },
    { id: 17, title: "Last Day of S...", date: 30, color: "text-purple-600", bgColor: "bg-lamaPurpleLight" },
];

const calendarAgenda = [
    { id: 1, title: "Big Day and Celebration Day", colorBorder: "border-lamaPurple", colorBg: "bg-lamaPurpleLight" },
    { id: 2, title: "Subject Presentation & Exam", colorBorder: "border-pink-500", colorBg: "bg-pink-100" },
    { id: 3, title: "Fair, Exhibition & Performance", colorBorder: "border-lamaSky", colorBg: "bg-lamaSkyLight" },
    { id: 4, title: "Official Meeting", colorBorder: "border-lamaYellow", colorBg: "bg-lamaYellowLight" },
];

const dailySchedule = [
    { id: 1, title: "Science Fair Setup", group: "Science Club", time: "09:30 am", border: "border-lamaSky", bg: "bg-lamaSkyLight" },
    { id: 2, title: "Teacher Meeting", group: "All Teacher", time: "11:00 am", border: "border-lamaYellow", bg: "bg-lamaYellowLight" },
    { id: 3, title: "Varsity Track Meet", group: "Track Team", time: "01:00 pm", border: "border-pink-500", bg: "bg-pink-100" },
    { id: 4, title: "Parents Meeting", group: "All Teacher and Parents", time: "02:00 pm", border: "border-lamaYellow", bg: "bg-lamaYellowLight" },
]

// -- Messages Page Mock Data --
const messageThreads = [
    { id: 1, name: "Dr. Lila Ramirez", time: "11:30 AM", snippet: "Please ensure the monthly attendance report is accurate before the April 30th deadline.", unread: 0, avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200", selected: false },
    { id: 2, name: "Ms. Heather Morris", time: "10:15 AM", snippet: "Don't forget the staff training on digital tools scheduled for May 5th at 3 PM in the...", unread: 2, avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200", selected: false },
    { id: 3, name: "Staff Coordination", time: "2:30 PM", snippet: "Ms. Patel: All staff performance reviews are due by the end of this month. Please submit your report...", unread: 0, avatar: "https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg?auto=compress&cs=tinysrgb&w=1200", selected: true }, // Group/Selected
    { id: 4, name: "Officer Dan Brooks", time: "3:40 PM", snippet: "Review the updated security protocols effective May 1st. Familiarize yourself with...", unread: 1, avatar: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1200", selected: false },
    { id: 5, name: "Ms. Tina Goldberg", time: "5:20 PM", snippet: "Reminder: Major IT system upgrade on May 8th from 1 PM to 4 PM.", unread: 1, avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1200", selected: false },
    { id: 6, name: "Mr. Roberto Gracias", time: "7:20 PM", snippet: "Reminder: Major IT system upgrade on May 8th from 1 PM to 4 PM.", unread: 1, avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1200", selected: false },
    { id: 7, name: "Mr. Reed", time: "11:20 PM", snippet: "Science Club meeting today at lunch in lab room 204. We'll be planning for the Science Fair.", unread: 0, avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1200", selected: false },
    { id: 8, name: "Nurse Emily", time: "7:20 PM", snippet: "Flu vaccinations are available next week. Please bring your consent forms signed...", unread: 2, avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200", selected: false },
];

const activeChatMessages = [
    { id: 1, sender: "Mr. Franklin", text: "Good morning everyone! Just a reminder about the staff meeting at 2 PM. Please bring your calendars.", time: "10:00 AM", isMe: false, color: "text-blue-500", avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 2, sender: "Mrs. Thomas", text: "Thanks for the reminder! Is there a specific agenda for today? I have a parent meeting at 3.", time: "10:05 AM", isMe: false, color: "text-pink-500", avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 3, sender: "Mr. Harris", text: "Can someone send the updated curriculum files? I seem to have misplaced the email attachment.", time: "10:15 AM", isMe: false, color: "text-green-500", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 4, sender: "Linda", text: "Harris, I just forwarded it to you. Let me know if you get it.", time: "10:20 AM", isMe: true, color: "text-slate-700", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 5, sender: "Ms. Patel", text: "All staff performance reviews are due by the end of this month. Please submit your report as soon as possible. Thanks!", time: "11:30 AM", isMe: false, color: "text-orange-500", avatar: "https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg?auto=compress&cs=tinysrgb&w=1200" },
];

const expensesData: Expense[] = [
    { id: "EX01", category: "Laboratory", expense: "Chemicals", quantity: "100 units", amount: "$500", paymentDate: "04/10/2024" },
    { id: "EX02", category: "Maintenance", expense: "HVAC Repair", quantity: "1 service", amount: "$3000", paymentDate: "04/05/2024", selected: true },
    { id: "EX03", category: "Boarding Equipment", expense: "Bedding Sets", quantity: "50 sets", amount: "$2500", paymentDate: "04/15/2024" },
    { id: "EX04", category: "Library", expense: "Books Acquisition", quantity: "200 books", amount: "$3000", paymentDate: "04/20/2024" },
    { id: "EX05", category: "Sports", expense: "Basketball Gear", quantity: "30 items", amount: "$1500", paymentDate: "04/12/2024" },
    { id: "EX06", category: "Infrastructure", expense: "Computers Upgrade", quantity: "10 pcs", amount: "$10000", paymentDate: "04/25/2024" },
    { id: "EX07", category: "Transportation", expense: "Bus Maintenance", quantity: "3 buses", amount: "$4500", paymentDate: "04/08/2024" },
    { id: "EX08", category: "Cafeteria", expense: "Kitchen Equipment Upgrade", quantity: "5 items", amount: "$8000", paymentDate: "04/18/2024" },
    { id: "EX09", category: "Arts & Crafts", expense: "Supplies Purchase", quantity: "100 kits", amount: "$1000", paymentDate: "04/22/2024" },
    { id: "EX10", category: "Maintenance", expense: "Painting School Building", quantity: "1 service", amount: "$7000", paymentDate: "04/05/2024" },
];

const booksData: Book[] = [
    { id: "2024-LIT-001-01", title: "Great Expectations", writer: "Charles Dickens", subject: "English Literature", class: "Class 12", publishDate: "1861", img: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: "2024-SCI-002-01", title: "Brief History of Time", writer: "Stephen Hawking", subject: "Science", class: "Class 10-12", publishDate: "1988", img: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: "2024-HIS-003-01", title: "A People's History of the United States", writer: "Howard Zinn", subject: "History", class: "Class 11-12", publishDate: "1980", img: "https://images.pexels.com/photos/2099266/pexels-photo-2099266.jpeg?auto=compress&cs=tinysrgb&w=1200", selected: true },
    { id: "2024-MATH-004-01", title: "Calculus Made Easy", writer: "Silvanus P. Thompson", subject: "Mathematics", class: "Class 12", publishDate: "1910", img: "https://images.pexels.com/photos/1329292/pexels-photo-1329292.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: "2024-BIO-005-01", title: "The Selfish Gene", writer: "Richard Dawkins", subject: "Biology", class: "Class 11", publishDate: "1976", img: "https://images.pexels.com/photos/1926988/pexels-photo-1926988.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: "2024-ART-006-01", title: "The Story of Art", writer: "E.H. Gombrich", subject: "Art History", class: "Class 9-12", publishDate: "1950", img: "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: "2024-CHE-007-01", title: "Organic Chemistry as a Second Language", writer: "David Klein", subject: "Chemistry", class: "Class 11-12", publishDate: "2012", img: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: "2024-ENG-009-01", title: "Elements of Style", writer: "William Strunk Jr.", subject: "English Grammar", class: "Class 9-12", publishDate: "1918", img: "https://images.pexels.com/photos/2061528/pexels-photo-2061528.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: "2024-PHY-008-01", title: "Fundamentals of Physics", writer: "David Halliday", subject: "Physics", class: "Class 11-12", publishDate: "2013", img: "https://images.pexels.com/photos/1018136/pexels-photo-1018136.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: "2024-PSY-010-01", title: "Thinking, Fast and Slow", writer: "Daniel Kahneman", subject: "Psychology", class: "Class 12", publishDate: "2011", img: "https://images.pexels.com/photos/33283/stack-of-books-vintage-books-book-books.jpg?auto=compress&cs=tinysrgb&w=1200" },
];

const studentsData: Student[] = [
    { id: 1, name: "Sarah Miller", email: "smiller@school.edu", studentId: "2016-01-001", class: "10A", dob: "01/10/2008", phone: "(555) 101-0101", img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 2, name: "Ethan Brown", email: "ebrown@school.edu", studentId: "2014-02-050", class: "12", dob: "07/23/2006", phone: "(555) 101-0101", img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1200", selected: true },
    { id: 3, name: "Olivia", email: "olivia@school.edu", studentId: "2017-03-003", class: "9B", dob: "09/05/2010", phone: "(555) 101-0101", img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1200", selected: true },
    { id: 4, name: "Lucas Johnson", email: "ljohnson@school.edu", studentId: "2015-01-004", class: "11A", dob: "11/02/2009", phone: "(555) 101-0101", img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 5, name: "Mia Williams", email: "mwilliams@school.edu", studentId: "2016-02-005", class: "8B", dob: "01/19/2007", phone: "(555) 101-0101", img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 6, name: "Noah Davis", email: "ndavis@school.edu", studentId: "2015-03-006", class: "8C", dob: "05/05/2010", phone: "(555) 101-0101", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 7, name: "Emma Wilson", email: "ewilson@school.edu", studentId: "2016-01-007", class: "7C", dob: "03/20/2007", phone: "(555) 101-0101", img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 8, name: "Liam Thompson", email: "lthompson@school.edu", studentId: "2017-03-008", class: "10B", dob: "06/28/2011", phone: "(555) 101-0101", img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 9, name: "Ava Garcia", email: "agarcia@school.edu", studentId: "2016-03-009", class: "11A", dob: "02/15/2009", phone: "(555) 101-0101", img: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 10, name: "James Martinez", email: "jmartinez@school.edu", studentId: "2018-01-010", class: "7B", dob: "12/12/2008", phone: "(555) 101-0101", img: "https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&w=1200" },
];

const teachersData: Teacher[] = [
    { id: 1, name: "Dean Guerrero", email: "deanguerrero@school.edu", teacherId: "1234567890", subjects: ["Math", "Geometry"], classes: ["1B", "2A", "3C"], phone: "(555) 555-5555", address: "123 Main St, Anytown, USA", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 2, name: "Ophelia Castro", email: "ocastro@school.edu", teacherId: "9876543210", subjects: ["Physics", "Chemistry"], classes: ["5A", "4B", "3C"], phone: "(555) 123-4567", address: "456 Elm St, Othertown, USA", img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200", selected: true },
    { id: 3, name: "Mike Myers", email: "mmyers@school.edu", teacherId: "1231231234", subjects: ["English", "Literature"], classes: ["5A", "4B", "3C"], phone: "(555) 555-5555", address: "789 Oak St, Sometown, USA", img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 4, name: "Hilda Silva", email: "hsilva@school.edu", teacherId: "4564564567", subjects: ["History", "Civics"], classes: ["1B", "2A", "3C"], phone: "(555) 555-5555", address: "321 Pine St, Anytown, USA", img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 5, name: "Leonard Krasner", email: "lkrasner@school.edu", teacherId: "7897897890", subjects: ["Biology", "Chemistry"], classes: ["5A", "4B", "3C"], phone: "(555) 555-5555", address: "654 Maple St, Othertown, USA", img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 6, name: "Maria Garcia", email: "mgarcia@school.edu", teacherId: "1357924680", subjects: ["Spanish", "French"], classes: ["1B", "2A", "3C"], phone: "(555) 555-5555", address: "987 Cedar St, Sometown, USA", img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 7, name: "John Smith", email: "jsmith@school.edu", teacherId: "2468013579", subjects: ["Art", "Design"], classes: ["5A", "4B", "3C"], phone: "(555) 555-5555", address: "159 Birch St, Anytown, USA", img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 8, name: "Sarah Jones", email: "sjones@school.edu", teacherId: "3692581470", subjects: ["Music", "Drama"], classes: ["1B", "2A", "3C"], phone: "(555) 555-5555", address: "753 Willow St, Othertown, USA", img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 9, name: "David Brown", email: "dbrown@school.edu", teacherId: "1472583690", subjects: ["PE", "Health"], classes: ["5A", "4B", "3C"], phone: "(555) 555-5555", address: "357 Poplar St, Sometown, USA", img: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 10, name: "Emily White", email: "ewhite@school.edu", teacherId: "2583691470", subjects: ["Computer Science", "Coding"], classes: ["1B", "2A", "3C"], phone: "(555) 555-5555", address: "951 Ash St, Anytown, USA", img: "https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&w=1200" },
];

const coursesData: Course[] = [
    { id: 1, name: "Advanced Mathematics", code: "MATH-301", teacher: "Dean Guerrero", class: "12A", schedule: "Mon, Wed, Fri", duration: "1 hour", students: 32, status: "Active", img: "https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 2, name: "Physics", code: "PHY-201", teacher: "Ophelia Castro", class: "11A", schedule: "Tue, Thu", duration: "1.5 hours", students: 28, status: "Active", img: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 3, name: "English Literature", code: "ENG-101", teacher: "Mike Myers", class: "10B", schedule: "Mon, Wed", duration: "1 hour", students: 35, status: "Active", img: "https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 4, name: "World History", code: "HIS-202", teacher: "Hilda Silva", class: "11B", schedule: "Tue, Thu, Fri", duration: "1 hour", students: 30, status: "Active", img: "https://images.pexels.com/photos/2781814/pexels-photo-2781814.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 5, name: "Biology", code: "BIO-301", teacher: "Leonard Krasner", class: "12B", schedule: "Mon, Wed, Fri", duration: "1.5 hours", students: 26, status: "Active", img: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 6, name: "Spanish I", code: "SPA-101", teacher: "Maria Garcia", class: "9A", schedule: "Tue, Thu", duration: "1 hour", students: 22, status: "Active", img: "https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 7, name: "Art & Design", code: "ART-201", teacher: "John Smith", class: "10A", schedule: "Wed, Fri", duration: "2 hours", students: 18, status: "Active", img: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 8, name: "Music Theory", code: "MUS-101", teacher: "Sarah Jones", class: "9B", schedule: "Mon, Thu", duration: "1 hour", students: 20, status: "Inactive", img: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 9, name: "Physical Education", code: "PE-100", teacher: "David Brown", class: "All", schedule: "Mon-Fri", duration: "45 mins", students: 40, status: "Active", img: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1200" },
    { id: 10, name: "Computer Science", code: "CS-301", teacher: "Emily White", class: "12A", schedule: "Tue, Thu, Fri", duration: "1.5 hours", students: 24, status: "Active", img: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200" },
];


// --- Components ---

const UserCard = ({ type, count, date, bg }: { type: string, count: string, date: string, bg: string }) => {
    return (
        <div className={`rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px] ${bg}`}>
            <div className="flex justify-between items-center">
                <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
                    {date}
                </span>
                <MoreHorizontal size={20} className="text-white cursor-pointer" />
            </div>
            <h1 className="text-2xl font-semibold my-4">{count}</h1>
            <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
        </div>
    );
};

const CountChart = () => {
    return (
        <div className="bg-white rounded-xl w-full h-full p-4">
            {/* Title */}
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Students</h1>
                <MoreHorizontal size={20} className="cursor-pointer text-gray-400" />
            </div>
            {/* Chart */}
            <div className="relative w-full h-[75%]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={studentData}>
                        <RadialBar
                            background
                            dataKey="count"
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <Users size={48} className="text-lamaPurple mx-auto mb-1 transform rotate-12" />
                </div>
            </div>
            {/* Legend */}
            <div className="flex justify-center gap-16">
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 bg-lamaSky rounded-full" />
                    <h1 className="font-bold">1,234</h1>
                    <h2 className="text-xs text-gray-300">Boys (55%)</h2>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 bg-lamaYellow rounded-full" />
                    <h1 className="font-bold">1,234</h1>
                    <h2 className="text-xs text-gray-300">Girls (45%)</h2>
                </div>
            </div>
        </div>
    );
};

const AttendanceChart = () => {
    return (
        <div className="bg-white rounded-xl w-full h-full p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">Attendance</h1>
                <MoreHorizontal size={20} className="cursor-pointer text-gray-400" />
            </div>
            <div className="w-full h-[90%]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={attendanceData}
                        barSize={20}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
                        <XAxis dataKey="name" axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
                        <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }} />
                        <Legend align="left" verticalAlign="top" wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }} />
                        <Bar dataKey="present" fill="#FAE27C" legendType="circle" radius={[10, 10, 0, 0]} />
                        <Bar dataKey="absent" fill="#C3EBFA" legendType="circle" radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const EarningsChart = () => {
    return (
        <div className="bg-white rounded-3xl p-6 h-full shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">Earnings</h2>
                <MoreHorizontal className="text-gray-400 cursor-pointer" />
            </div>

            <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={earningsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            tickFormatter={(value) => `${value}K`}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                        />
                        <Legend
                            verticalAlign="top"
                            align="center"
                            height={36}
                            iconType="circle"
                            formatter={(value) => <span className="text-slate-600 font-medium ml-1 mr-4">{value}</span>}
                        />
                        <Line
                            type="monotone"
                            dataKey="income"
                            name="Income"
                            stroke="#A5F3FC"
                            strokeWidth={4}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="expense"
                            name="Expense"
                            stroke="#CFCEFF"
                            strokeWidth={4}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const EventCalendar = () => {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="p-1 rounded-full border border-gray-200 cursor-pointer hover:bg-gray-50">
                    <ChevronLeft size={16} className="text-gray-400" />
                </div>
                <h2 className="font-bold text-lg text-slate-800">September 2030</h2>
                <div className="p-1 rounded-full border border-gray-200 cursor-pointer hover:bg-gray-50">
                    <ChevronRight size={16} className="text-gray-400" />
                </div>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 text-center mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <span key={d} className={`text-xs font-medium ${d === 'Wed' ? 'text-sky-400' : 'text-gray-400'}`}>{d}</span>
                ))}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-7 text-center mb-4">
                {[19, 20, 21, 22, 23, 24, 25].map(d => (
                    <div key={d} className="flex items-center justify-center">
                        <span className={`text-sm font-bold w-8 h-8 flex items-center justify-center rounded-xl cursor-pointer transition-colors
                    ${d === 22 ? 'bg-lamaSky text-sky-600' : 'text-slate-800 hover:bg-gray-50'}`}>
                            {d}
                        </span>
                    </div>
                ))}
            </div>

            {/* Agenda Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-bold text-slate-800">Agenda</h1>
                <MoreHorizontal size={20} className="cursor-pointer text-gray-400" />
            </div>

            {/* Agenda Items */}
            <div className="flex flex-col gap-4">
                {agendaItems.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                        {/* Time */}
                        <span className="text-xs font-bold text-gray-400 w-16">{item.time}</span>

                        {/* Card */}
                        <div className={`flex-1 p-3 rounded-lg border-l-4 ${item.colorBg} ${item.colorBorder}`}>
                            <span className="text-[10px] text-gray-500 font-medium block mb-1">{item.scope}</span>
                            <h3 className="text-sm font-bold text-slate-700 leading-tight">{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Announcements = () => {
    return (
        <div className="bg-white p-4 rounded-xl">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Announcements</h1>
                <span className="text-xs text-gray-400 cursor-pointer">View All</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                {announcements.map((ann) => (
                    <div className={`${ann.bg} rounded-md p-4`} key={ann.id}>
                        <div className="flex items-center justify-between">
                            <h2 className="font-medium text-gray-600">{ann.title}</h2>
                            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                                {ann.time}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{ann.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const NoticeBoard = () => {
    return (
        <div className="bg-white p-4 rounded-3xl shadow-sm h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-800">Notice Board</h2>
                <Sliders size={18} className="text-gray-400 cursor-pointer transform rotate-90" />
            </div>
            <div className="flex flex-col gap-4">
                {noticesData.map(notice => (
                    <div key={notice.id} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-none last:pb-0">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                                <img src={notice.img} alt="" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="font-bold text-slate-700 text-xs md:text-sm">{notice.title}</h3>
                        </div>

                        <span className="hidden md:block text-[10px] font-medium text-sky-600 bg-lamaSkyLight px-2 py-0.5 rounded-full">
                            {notice.date}
                        </span>

                        <div className="hidden md:flex flex-col min-w-[80px]">
                            <span className="text-[10px] text-slate-600 font-medium">By {notice.author}</span>
                            <span className="text-[9px] text-gray-400">({notice.role})</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-medium shrink-0">
                            <div className="w-5 h-5 rounded-full bg-lamaPurpleLight flex items-center justify-center text-purple-600">
                                <Eye size={10} />
                            </div>
                            <span>{notice.views}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StudentActivity = () => {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold text-slate-800">Student Activity</h1>
                <span className="text-xs text-gray-400 cursor-pointer">View All</span>
            </div>
            <div className="flex flex-col gap-6">
                {activitiesData.map(act => (
                    <div key={act.id} className="flex gap-4 items-start">
                        <div className={`min-w-8 w-8 h-8 rounded-full ${act.bg} flex items-center justify-center`}>
                            {act.icon}
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm text-slate-800">{act.title}</h3>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{act.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Messages = () => {
    return (
        <div className="bg-white p-4 rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold text-slate-800">Messages</h1>
                <span className="text-xs text-gray-400 cursor-pointer">View All</span>
            </div>
            <div className="flex flex-col gap-4">
                {messagesData.map((msg) => (
                    <div key={msg.id} className="flex gap-4 p-2 bg-white rounded-md hover:bg-gray-50 transition-colors">
                        <img src={msg.img} alt={msg.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex flex-col flex-1 gap-1 min-w-0">
                            <div className="flex justify-between items-center gap-2">
                                <h3 className="font-semibold text-sm text-slate-800 truncate">{msg.name}</h3>
                                <span className="text-[10px] text-gray-400 whitespace-nowrap">{msg.time}</span>
                            </div>
                            <div className="flex justify-between items-start">
                                <p className="text-xs text-gray-500 line-clamp-2 pr-2 leading-relaxed">{msg.message}</p>
                                {msg.unread > 0 && (
                                    <div className="w-5 h-5 rounded-full bg-lamaPurple flex items-center justify-center text-[10px] text-slate-600 font-bold flex-shrink-0">
                                        {msg.unread}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const FeesChart = () => {
    return (
        <div className="bg-white rounded-3xl p-6 h-[300px] shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-800">Fees Collection</h2>
                <MoreHorizontal className="text-gray-400 cursor-pointer" />
            </div>
            <div className="w-full h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={feesCollectionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FAE27C" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#FAE27C" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            tickFormatter={(value) => value === 0 ? '0' : value.toLocaleString()}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ fontSize: '12px', fontWeight: 600, color: '#eab308' }}
                            formatter={(value) => [`$${value}`, 'Fees']}
                        />
                        <Area type="monotone" dataKey="value" stroke="#FACC15" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const FeesTable = () => {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm mt-6 flex-1">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-800">Fees Collection</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-lamaSkyLight text-slate-700 font-semibold">
                        <tr>
                            <th className="p-4 rounded-tl-xl rounded-bl-xl w-10">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500" />
                            </th>
                            <th className="p-4">Student Name</th>
                            <th className="p-4">Class</th>
                            <th className="p-4 rounded-tr-xl rounded-br-xl text-right">Tuition Fee</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {feesTableData.map((student) => (
                            <tr key={student.id} className={`group hover:bg-gray-50 transition-colors ${student.selected ? 'bg-indigo-50/50 hover:bg-indigo-50/80' : ''}`}>
                                <td className="p-4">
                                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${student.selected ? 'bg-sky-400 border-sky-400' : 'border-gray-300'}`}>
                                        {student.selected && <Check size={12} className="text-white" />}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full overflow-hidden">
                                            <img src={student.img} alt={student.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-800">{student.name}</span>
                                            <span className="text-[10px] text-gray-400">{student.studentId}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 font-medium text-slate-700">{student.class}</td>
                                <td className="p-4 text-right font-bold text-slate-700">{student.fee}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center gap-4 mt-6">
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-gray-50">
                    Previous
                </button>
            </div>

            <div className="mt-8 flex gap-6 text-xs text-gray-400 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2">
                    <Mail size={14} />
                    <span>emailaddress@mail.com</span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone size={14} />
                    <span>+82 1234 5678</span>
                </div>
            </div>
        </div>
    );
};

const ExpensesPage = () => {
    return (
        <div className="p-6 h-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-xl font-bold text-slate-800">School Expenses</h1>
                <div className="flex items-center gap-4 flex-wrap">
                    {/* Search */}
                    <div className="flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-200 px-4 py-2 bg-white w-[250px]">
                        <Search size={16} className="text-gray-400" />
                        <input type="text" placeholder="Search by ID or Expense" className="w-full bg-transparent outline-none text-gray-600 placeholder-gray-400" />
                    </div>
                    {/* Filters */}
                    <div className="flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-200 px-4 py-2 bg-white cursor-pointer hover:bg-gray-50">
                        <CalendarDays size={16} className="text-gray-400" />
                        <span className="text-slate-600 font-medium">April 2024</span>
                        <ChevronRight size={14} className="text-gray-400 rotate-90" />
                    </div>
                    <div className="flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-200 px-4 py-2 bg-white cursor-pointer hover:bg-gray-50">
                        <span className="text-slate-600 font-medium">All Categories</span>
                        <ChevronRight size={14} className="text-gray-400 rotate-90" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm flex-1 flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-lamaSkyLight text-slate-700 font-semibold">
                            <tr>
                                <th className="p-4 rounded-tl-xl rounded-bl-xl">ID</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Expense</th>
                                <th className="p-4">Quantity</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Payment Date</th>
                                <th className="p-4 rounded-tr-xl rounded-br-xl">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {expensesData.map((expense) => (
                                <tr key={expense.id} className={`group hover:bg-gray-50 transition-colors ${expense.selected ? 'bg-purple-50/50 hover:bg-purple-50' : ''}`}>
                                    <td className="p-4 font-medium text-slate-700">{expense.id}</td>
                                    <td className="p-4 text-slate-600">{expense.category}</td>
                                    <td className="p-4 font-medium text-slate-800">{expense.expense}</td>
                                    <td className="p-4 text-slate-600">{expense.quantity}</td>
                                    <td className="p-4 font-bold text-slate-800">{expense.amount}</td>
                                    <td className="p-4 text-slate-600">{expense.paymentDate}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <button className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-purple-100 text-gray-400 hover:text-purple-600 transition-colors">
                                                <FilePenLine size={14} />
                                            </button>
                                            <button className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-auto pt-6 gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50">
                        <ChevronLeft size={16} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-lamaSky text-sky-600 font-bold text-xs">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-xs">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-xs">3</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-xs">4</button>
                    <span className="text-gray-400 text-xs">...</span>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-xs">12</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50">
                        <ChevronRight size={16} />
                    </button>
                </div>

                <div className="mt-8 flex gap-6 text-xs text-gray-400 border-t border-gray-100 pt-6 justify-center md:justify-start">
                    <div className="flex items-center gap-2">
                        <Mail size={14} />
                        <span>emailaddress@mail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone size={14} />
                        <span>+82 1234 5678</span>
                    </div>
                    <div className="ml-auto flex gap-4 hidden md:flex">
                        <span>Terms of Use</span>
                        <span>Privacy Policy</span>
                        <span>Copyright © Peterdraw</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LibraryPage = () => {
    return (
        <div className="p-6 h-full flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-slate-800">All Books</h1>
                <div className="flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-200 px-4 py-2 bg-white w-[250px]">
                    <Search size={16} className="text-gray-400" />
                    <input type="text" placeholder="Search by Book Name or Writer" className="w-full bg-transparent outline-none text-gray-600 placeholder-gray-400" />
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm flex-1 flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-lamaSkyLight text-slate-700 font-semibold">
                            <tr>
                                <th className="p-4 rounded-tl-xl rounded-bl-xl w-10">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500" />
                                </th>
                                <th className="p-4">Book ID</th>
                                <th className="p-4">Book Name</th>
                                <th className="p-4">Writer</th>
                                <th className="p-4">Subject</th>
                                <th className="p-4">Class</th>
                                <th className="p-4">Publish Date</th>
                                <th className="p-4 rounded-tr-xl rounded-br-xl">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {booksData.map((book) => (
                                <tr key={book.id} className={`group hover:bg-gray-50 transition-colors ${book.selected ? 'bg-purple-50/50 hover:bg-purple-50' : ''}`}>
                                    <td className="p-4">
                                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${book.selected ? 'bg-sky-400 border-sky-400' : 'border-gray-300'}`}>
                                            {book.selected && <Check size={12} className="text-white" />}
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-slate-600">{book.id}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-10 rounded overflow-hidden bg-gray-200">
                                                <img src={book.img} alt={book.title} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-semibold text-slate-800">{book.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-600">{book.writer}</td>
                                    <td className="p-4 text-slate-600">{book.subject}</td>
                                    <td className="p-4 text-slate-600">{book.class}</td>
                                    <td className="p-4 text-slate-600">{book.publishDate}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <button className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-purple-100 text-gray-400 hover:text-purple-600 transition-colors">
                                                <FilePenLine size={14} />
                                            </button>
                                            <button className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-auto pt-6 gap-2">
                    <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-gray-50">
                        Previous
                    </button>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-lamaSky text-sky-600 font-bold text-xs">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-xs">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-xs">3</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-xs">4</button>
                        <span className="flex items-center text-gray-400 text-xs">...</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-xs">12</button>
                    </div>
                    <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-gray-50">
                        Next
                    </button>
                </div>

                <div className="mt-8 flex gap-6 text-xs text-gray-400 border-t border-gray-100 pt-6 justify-center md:justify-start">
                    <div className="flex items-center gap-2">
                        <Mail size={14} />
                        <span>emailaddress@mail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone size={14} />
                        <span>+82 1234 5678</span>
                    </div>
                    <div className="ml-auto flex gap-4 hidden md:flex">
                        <span>Terms of Use</span>
                        <span>Privacy Policy</span>
                        <span>Copyright © Peterdraw</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StudentsPage = () => {
    const [students, setStudents] = useState<Student[]>(studentsData);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newStudent, setNewStudent] = useState({
        name: '', email: '', studentId: '', class: '', dob: '', phone: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddStudent = async () => {
        if (!newStudent.name || !newStudent.email || !newStudent.studentId) return;
        setIsSubmitting(true);

        const student: Student = {
            id: Date.now(),
            name: newStudent.name,
            email: newStudent.email,
            studentId: newStudent.studentId,
            class: newStudent.class,
            dob: newStudent.dob,
            phone: newStudent.phone,
            img: `https://ui-avatars.com/api/?name=${encodeURIComponent(newStudent.name)}&background=C3EBFA&color=1e293b&bold=true&size=128`,
        };

        try {
            const { supabase } = await import('./supabaseClient');
            const { error } = await supabase.from('students').insert([{
                name: student.name,
                email: student.email,
                student_id: student.studentId,
                class: student.class,
                dob: student.dob || null,
                phone: student.phone,
                img: student.img,
            }]);
            if (error) console.warn('Supabase insert failed (table may not exist yet):', error.message);
        } catch (e) {
            console.warn('Supabase not available, saving locally only.');
        }

        setStudents(prev => [student, ...prev]);
        setNewStudent({ name: '', email: '', studentId: '', class: '', dob: '', phone: '' });
        setShowAddModal(false);
        setIsSubmitting(false);
    };

    const handleDeleteStudent = (id: number) => {
        setStudents(prev => prev.filter(s => s.id !== id));
    };

    return (
        <div className="p-6 h-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-xl font-bold text-slate-800">All Students List</h1>
                <div className="flex items-center gap-4 flex-wrap">
                    {/* Search */}
                    <div className="flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-200 px-4 py-2 bg-white w-[250px]">
                        <Search size={16} className="text-gray-400" />
                        <input type="text" placeholder="Search..." className="w-full bg-transparent outline-none text-gray-600 placeholder-gray-400" />
                    </div>
                    {/* Filters */}
                    <button className="w-8 h-8 rounded-full bg-lamaYellow flex items-center justify-center cursor-pointer hover:bg-lamaYellowLight transition-colors">
                        <Sliders size={16} className="text-slate-800 rotate-90" />
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="w-8 h-8 rounded-full bg-lamaYellow flex items-center justify-center cursor-pointer hover:bg-lamaYellowLight transition-colors"
                    >
                        <Plus size={16} className="text-slate-800" />
                    </button>
                </div>
            </div>

            {/* Add Student Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
                    <div
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                        style={{ animation: 'modalSlideIn 0.3s ease-out' }}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Add New Student</h2>
                                <p className="text-xs text-gray-400 mt-0.5">Fill in the student details below</p>
                            </div>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 flex flex-col gap-4">
                            {/* Name & Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Full Name <span className="text-red-400">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Sarah Miller"
                                        value={newStudent.name}
                                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Email <span className="text-red-400">*</span></label>
                                    <input
                                        type="email"
                                        placeholder="e.g. smiller@school.edu"
                                        value={newStudent.email}
                                        onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                                        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Student ID & Class */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Student ID <span className="text-red-400">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 2024-01-001"
                                        value={newStudent.studentId}
                                        onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
                                        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Class</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 10A"
                                        value={newStudent.class}
                                        onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                                        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                                    />
                                </div>
                            </div>

                            {/* DOB & Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Date of Birth</label>
                                    <input
                                        type="date"
                                        value={newStudent.dob}
                                        onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
                                        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Phone</label>
                                    <input
                                        type="tel"
                                        placeholder="e.g. (555) 101-0101"
                                        value={newStudent.phone}
                                        onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                                        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddStudent}
                                disabled={!newStudent.name || !newStudent.email || !newStudent.studentId || isSubmitting}
                                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-sky-400 text-white hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <Plus size={16} />
                                        Add Student
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-3xl p-6 shadow-sm flex-1 flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-lamaSkyLight text-slate-700 font-semibold">
                            <tr>
                                <th className="p-4 rounded-tl-xl rounded-bl-xl w-10">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500" />
                                </th>
                                <th className="p-4">Student Name</th>
                                <th className="p-4">Student ID</th>
                                <th className="p-4">Class</th>
                                <th className="p-4">DOB</th>
                                <th className="p-4">Phone Number</th>
                                <th className="p-4 rounded-tr-xl rounded-br-xl">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {students.map((student) => (
                                <tr key={student.id} className={`group hover:bg-gray-50 transition-colors ${student.selected ? 'bg-purple-50/50 hover:bg-purple-50' : ''}`}>
                                    <td className="p-4">
                                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${student.selected ? 'bg-sky-400 border-sky-400' : 'border-gray-300'}`}>
                                            {student.selected && <Check size={12} className="text-white" />}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                                                <img src={student.img} alt={student.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-800">{student.name}</span>
                                                <span className="text-[10px] text-gray-400">{student.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-slate-600">{student.studentId}</td>
                                    <td className="p-4 font-medium text-slate-800">{student.class}</td>
                                    <td className="p-4 text-slate-600">
                                        <span className="bg-gray-50 px-2 py-1 rounded-md text-xs font-medium border border-gray-100">
                                            {student.dob}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-600 font-medium">{student.phone}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <button className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-purple-100 text-gray-400 hover:text-purple-600 transition-colors">
                                                <FilePenLine size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteStudent(student.id)}
                                                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-auto pt-6 gap-2">
                    <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-gray-50">
                        Previous
                    </button>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-lamaSky text-sky-600 font-bold text-xs">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-xs">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-xs">3</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-xs">4</button>
                        <span className="flex items-center text-gray-400 text-xs">...</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-xs">12</button>
                    </div>
                    <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-gray-50">
                        Next
                    </button>
                </div>

                <div className="mt-8 flex gap-6 text-xs text-gray-400 border-t border-gray-100 pt-6 justify-center md:justify-start">
                    <div className="flex items-center gap-2">
                        <Mail size={14} />
                        <span>emailaddress@mail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone size={14} />
                        <span>+82 1234 5678</span>
                    </div>
                    <div className="ml-auto flex gap-4 hidden md:flex">
                        <span>Terms of Use</span>
                        <span>Privacy Policy</span>
                        <span>Copyright © Peterdraw</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TeachersPage = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newTeacher, setNewTeacher] = useState({
        name: '', email: '', teacherId: '', subjects: '', classes: '', phone: '', address: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch teachers from Supabase on mount
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const { supabase } = await import('./supabaseClient');
                const { data, error } = await supabase
                    .from('teachers')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.warn('Failed to fetch teachers from Supabase:', error.message);
                    setTeachers(teachersData);
                    return;
                }

                if (data && data.length > 0) {
                    setTeachers(data.map((t: any) => ({
                        id: t.id,
                        name: t.name,
                        email: t.email,
                        teacherId: t.teacher_id,
                        subjects: t.subjects || [],
                        classes: t.classes || [],
                        phone: t.phone || '',
                        address: t.address || '',
                        img: t.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=C3EBFA&color=1e293b&bold=true&size=128`,
                    })));
                } else {
                    setTeachers(teachersData);
                }
            } catch (e) {
                console.warn('Supabase not available, using local data.');
                setTeachers(teachersData);
            }
        };
        fetchTeachers();
    }, []);

    const handleAddTeacher = async () => {
        if (!newTeacher.name || !newTeacher.email || !newTeacher.teacherId) return;
        setIsSubmitting(true);

        const img = `https://ui-avatars.com/api/?name=${encodeURIComponent(newTeacher.name)}&background=C3EBFA&color=1e293b&bold=true&size=128`;
        const subjects = newTeacher.subjects.split(',').map(s => s.trim()).filter(Boolean);
        const classes = newTeacher.classes.split(',').map(s => s.trim()).filter(Boolean);

        try {
            const { supabase } = await import('./supabaseClient');
            const { data, error } = await supabase.from('teachers').insert([{
                name: newTeacher.name,
                email: newTeacher.email,
                teacher_id: newTeacher.teacherId,
                subjects,
                classes,
                phone: newTeacher.phone,
                address: newTeacher.address,
                img,
            }]).select();

            if (error) {
                alert('Failed to add teacher: ' + error.message);
                setIsSubmitting(false);
                return;
            }

            if (data && data[0]) {
                const t = data[0];
                const teacher: Teacher = {
                    id: t.id,
                    name: t.name,
                    email: t.email,
                    teacherId: t.teacher_id,
                    subjects: t.subjects || [],
                    classes: t.classes || [],
                    phone: t.phone || '',
                    address: t.address || '',
                    img: t.img || img,
                };
                setTeachers(prev => [teacher, ...prev]);
            }
        } catch (e) {
            alert('Could not connect to database. Please check your connection.');
            setIsSubmitting(false);
            return;
        }

        setNewTeacher({ name: '', email: '', teacherId: '', subjects: '', classes: '', phone: '', address: '' });
        setShowAddModal(false);
        setIsSubmitting(false);
    };

    const handleDeleteTeacher = async (id: number) => {
        try {
            const { supabase } = await import('./supabaseClient');
            const { error } = await supabase.from('teachers').delete().eq('id', id);
            if (error) {
                console.warn('Failed to delete from Supabase:', error.message);
            }
        } catch (e) {
            console.warn('Supabase not available for delete.');
        }
        setTeachers(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="p-6 h-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-xl font-bold text-slate-800">All Teachers</h1>
                <div className="flex items-center gap-4 flex-wrap">
                    {/* Search */}
                    <div className="flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-200 px-4 py-2 bg-white w-[250px]">
                        <Search size={16} className="text-gray-400" />
                        <input type="text" placeholder="Search..." className="w-full bg-transparent outline-none text-gray-600 placeholder-gray-400" />
                    </div>
                    {/* Filters */}
                    <button className="w-8 h-8 rounded-full bg-lamaYellow flex items-center justify-center cursor-pointer hover:bg-lamaYellowLight transition-colors">
                        <Sliders size={16} className="text-slate-800 rotate-90" />
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="w-8 h-8 rounded-full bg-lamaYellow flex items-center justify-center cursor-pointer hover:bg-lamaYellowLight transition-colors"
                    >
                        <Plus size={16} className="text-slate-800" />
                    </button>
                </div>
            </div>

            {/* Add Teacher Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
                    <div
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                        style={{ animation: 'modalSlideIn 0.3s ease-out' }}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Add New Teacher</h2>
                                <p className="text-xs text-gray-400 mt-0.5">Fill in the details below</p>
                            </div>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 flex flex-col gap-4">
                            {/* Name & Email Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Full Name <span className="text-red-400">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="e.g. John Smith"
                                        value={newTeacher.name}
                                        onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                                        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Email <span className="text-red-400">*</span></label>
                                    <input
                                        type="email"
                                        placeholder="e.g. jsmith@school.edu"
                                        value={newTeacher.email}
                                        onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                                        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Teacher ID & Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Teacher ID <span className="text-red-400">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 1234567890"
                                        value={newTeacher.teacherId}
                                        onChange={(e) => setNewTeacher({ ...newTeacher, teacherId: e.target.value })}
                                        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Phone</label>
                                    <input
                                        type="tel"
                                        placeholder="e.g. (555) 555-5555"
                                        value={newTeacher.phone}
                                        onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                                        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Subjects & Classes */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Subjects</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Math, Physics"
                                        value={newTeacher.subjects}
                                        onChange={(e) => setNewTeacher({ ...newTeacher, subjects: e.target.value })}
                                        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                                    />
                                    <span className="text-[10px] text-gray-400">Separate with commas</span>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Classes</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 1A, 2B, 3C"
                                        value={newTeacher.classes}
                                        onChange={(e) => setNewTeacher({ ...newTeacher, classes: e.target.value })}
                                        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                                    />
                                    <span className="text-[10px] text-gray-400">Separate with commas</span>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-slate-600">Address</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 123 Main St, Anytown, USA"
                                    value={newTeacher.address}
                                    onChange={(e) => setNewTeacher({ ...newTeacher, address: e.target.value })}
                                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddTeacher}
                                disabled={!newTeacher.name || !newTeacher.email || !newTeacher.teacherId || isSubmitting}
                                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-sky-400 text-white hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <Plus size={16} />
                                        Add Teacher
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-3xl p-6 shadow-sm flex-1 flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-lamaSkyLight text-slate-700 font-semibold">
                            <tr>
                                <th className="p-4 rounded-tl-xl rounded-bl-xl w-10">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500" />
                                </th>
                                <th className="p-4">Teacher Name</th>
                                <th className="p-4">Teacher ID</th>
                                <th className="p-4">Subjects</th>
                                <th className="p-4">Classes</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Address</th>
                                <th className="p-4 rounded-tr-xl rounded-br-xl">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {teachers.map((teacher) => (
                                <tr key={teacher.id} className={`group hover:bg-gray-50 transition-colors ${teacher.selected ? 'bg-purple-50/50 hover:bg-purple-50' : ''}`}>
                                    <td className="p-4">
                                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${teacher.selected ? 'bg-sky-400 border-sky-400' : 'border-gray-300'}`}>
                                            {teacher.selected && <Check size={12} className="text-white" />}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                                                <img src={teacher.img} alt={teacher.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-800">{teacher.name}</span>
                                                <span className="text-[10px] text-gray-400">{teacher.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-slate-600">{teacher.teacherId}</td>
                                    <td className="p-4 text-slate-600">
                                        <div className="flex gap-1 flex-wrap">
                                            {teacher.subjects.map((sub, idx) => (
                                                <span key={idx} className="bg-gray-50 px-2 py-0.5 rounded text-[10px] border border-gray-100 text-gray-500 font-medium">
                                                    {sub}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-600">
                                        <div className="flex gap-1 flex-wrap">
                                            {teacher.classes.map((cls, idx) => (
                                                <span key={idx} className="bg-gray-50 px-2 py-0.5 rounded text-[10px] border border-gray-100 text-gray-500 font-medium">
                                                    {cls}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-600 font-medium">{teacher.phone}</td>
                                    <td className="p-4 text-slate-600 text-xs max-w-[150px] truncate" title={teacher.address}>{teacher.address}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <button className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-purple-100 text-gray-400 hover:text-purple-600 transition-colors">
                                                <FilePenLine size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTeacher(teacher.id)}
                                                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-auto pt-6 gap-2">
                    <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-gray-50">
                        Previous
                    </button>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-lamaSky text-sky-600 font-bold text-xs">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-xs">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-xs">3</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-xs">4</button>
                        <span className="flex items-center text-gray-400 text-xs">...</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-xs">12</button>
                    </div>
                    <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-gray-50">
                        Next
                    </button>
                </div>

                <div className="mt-8 flex gap-6 text-xs text-gray-400 border-t border-gray-100 pt-6 justify-center md:justify-start">
                    <div className="flex items-center gap-2">
                        <Mail size={14} />
                        <span>emailaddress@mail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone size={14} />
                        <span>+82 1234 5678</span>
                    </div>
                    <div className="ml-auto flex gap-4 hidden md:flex">
                        <span>Terms of Use</span>
                        <span>Privacy Policy</span>
                        <span>Copyright © Peterdraw</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CalendarPage = () => {
    // Generate dates for May 2030 (Static for demo)
    // May 1 2030 is Wednesday.
    const dates = [];

    // Add empty slots for Mon, Tue
    dates.push({ day: null }); // Sun (Not showing in screenshot, but usually calendars have Sun)
    dates.push({ day: null }); // Mon
    dates.push({ day: null }); // Tue

    // Add days 1-31
    for (let i = 1; i <= 31; i++) {
        dates.push({ day: i });
    }

    // Add remaining empty slots to fill the grid (7 columns)
    const totalCells = Math.ceil(dates.length / 7) * 7;
    for (let i = dates.length; i < totalCells; i++) {
        dates.push({ day: null });
    }

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="p-6 h-full flex flex-col md:flex-row gap-6">
            {/* Left: Calendar View */}
            <div className="w-full md:w-3/4 flex flex-col h-full bg-white rounded-3xl p-6 shadow-sm overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-xl font-bold text-slate-800">May 2030</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-semibold text-gray-400">Today</span>
                        <div className="flex gap-1">
                            <div className="p-1 rounded-md bg-purple-100 text-purple-600 cursor-pointer hover:bg-purple-200">
                                <ChevronLeft size={16} />
                            </div>
                            <div className="p-1 rounded-md bg-purple-100 text-purple-600 cursor-pointer hover:bg-purple-200">
                                <ChevronRight size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                    {/* Header */}
                    <div className="grid grid-cols-7 mb-4">
                        {weekDays.map(day => (
                            <div key={day} className="text-center text-xs font-semibold text-gray-400 uppercase">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-7 flex-1 auto-rows-fr gap-4">
                        {/* We need to correct the offset for May 1st 2030 (Wednesday) */}
                        {/* 0: Sun, 1: Mon, 2: Tue, 3: Wed ... */}
                        {/* Empty slots for Sun, Mon, Tue */}
                        {[...Array(3)].map((_, i) => (
                            <div key={`empty-${i}`} className="h-full min-h-[100px] border-t border-gray-100 p-2"></div>
                        ))}

                        {[...Array(31)].map((_, i) => {
                            const day = i + 1;
                            const dayEvents = calendarEvents.filter(e => e.date === day);
                            return (
                                <div key={day} className="h-full min-h-[100px] border-t border-gray-100 p-2 flex flex-col gap-1 relative group hover:bg-gray-50 transition-colors">
                                    <span className="text-xs font-semibold text-gray-500 mb-1 block">{day.toString().padStart(2, '0')}</span>
                                    {dayEvents.map(event => (
                                        <div key={event.id} className={`text-[10px] px-2 py-1 rounded-md truncate font-medium ${event.bgColor} ${event.color} cursor-pointer hover:opacity-80`}>
                                            {event.title}
                                        </div>
                                    ))}
                                    {/* Add button on hover */}
                                    <button className="hidden group-hover:flex absolute top-2 right-2 w-5 h-5 bg-purple-100 rounded-full items-center justify-center text-purple-600">
                                        <Plus size={12} />
                                    </button>
                                </div>
                            )
                        })}

                        {/* Remaining empty slots */}
                        {[...Array(1)].map((_, i) => (
                            <div key={`empty-end-${i}`} className="h-full min-h-[100px] border-t border-gray-100 p-2"></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right: Sidebar Widgets */}
            <div className="w-full md:w-1/4 flex flex-col gap-6">
                {/* Agenda */}
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-800">Agenda</h2>
                        <MoreHorizontal className="text-gray-400 cursor-pointer" />
                    </div>
                    <div className="flex flex-col gap-4">
                        {calendarAgenda.map(item => (
                            <div key={item.id} className={`p-3 rounded-lg border-l-4 ${item.colorBorder} ${item.colorBg}`}>
                                <h3 className="text-xs font-bold text-slate-700">{item.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Daily Schedule */}
                <div className="bg-white rounded-3xl p-6 shadow-sm flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-800">May, 8 2030</h2>
                        <MoreHorizontal className="text-gray-400 cursor-pointer" />
                    </div>

                    <div className="flex flex-col gap-6 relative">
                        {/* Timeline Line */}
                        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100"></div>

                        {dailySchedule.map(item => (
                            <div key={item.id} className="relative pl-6">
                                {/* Dot */}
                                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-[3px] border-white bg-slate-800 ring-1 ring-slate-200 z-10"></div>

                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-xs font-bold text-slate-800">{item.title}</h3>
                                    <span className="text-[10px] text-gray-400 whitespace-nowrap">{item.time}</span>
                                </div>
                                <span className="text-[10px] text-gray-400 block mb-2">{item.group}</span>

                                {/* Card preview if needed, simplifying to colored block for now to match style */}
                                <div className={`h-1 w-12 rounded-full ${item.bg.replace('light', '').replace('bg-', 'bg-').replace('100', '400')}`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MessagesPage = () => {
    return (
        <div className="p-6 h-full">
            <div className="bg-white rounded-3xl h-full shadow-sm flex overflow-hidden">
                {/* Left: Message List */}
                <div className="w-full md:w-1/3 border-r border-gray-100 flex flex-col">
                    <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                        <div className="flex-1 flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-200 px-4 py-2 bg-white">
                            <Search size={16} className="text-gray-400" />
                            <input type="text" placeholder="Search" className="w-full bg-transparent outline-none text-gray-600 placeholder-gray-400" />
                            <Sliders size={16} className="text-gray-400 rotate-90 cursor-pointer" />
                        </div>
                        <div className="w-9 h-9 rounded-full bg-lamaSkyLight flex items-center justify-center cursor-pointer text-sky-600 hover:bg-sky-200 transition-colors">
                            <Plus size={18} />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {messageThreads.map(thread => (
                            <div key={thread.id} className={`p-4 flex gap-3 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${thread.selected ? 'bg-lamaPurpleLight border-l-lamaPurple' : 'border-l-transparent'}`}>
                                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                                    <img src={thread.avatar} alt={thread.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="text-sm font-bold text-slate-800 truncate">{thread.name}</h3>
                                        <span className="text-[10px] text-gray-400">{thread.time}</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{thread.snippet}</p>
                                        {thread.unread > 0 && (
                                            <div className="ml-2 w-4 h-4 rounded-full bg-lamaPurple flex items-center justify-center text-[8px] font-bold text-slate-700 shrink-0">
                                                {thread.unread}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Chat Detail */}
                <div className="hidden md:flex flex-col w-2/3 bg-lamaPurpleLight/30">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-100 bg-white flex justify-between items-center h-[72px]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img src="https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Staff Coordination" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-800 text-sm">Staff Coordination</h2>
                                <p className="text-[10px] text-gray-400">Click here to view group info</p>
                            </div>
                        </div>
                        <div className="flex gap-4 text-gray-400">
                            <Phone size={20} className="cursor-pointer hover:text-slate-600" />
                            <Video size={20} className="cursor-pointer hover:text-slate-600" />
                            <MoreVertical size={20} className="cursor-pointer hover:text-slate-600" />
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
                        {/* Date Separator */}
                        <div className="flex justify-center">
                            <span className="text-[10px] bg-white px-3 py-1 rounded-full text-gray-400 shadow-sm border border-gray-100">Today</span>
                        </div>

                        {activeChatMessages.map(msg => (
                            <div key={msg.id} className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-1">
                                    <img src={msg.avatar} alt={msg.sender} className="w-full h-full object-cover" />
                                </div>
                                <div className={`max-w-[70%] flex flex-col gap-1 ${msg.isMe ? 'items-end' : 'items-start'}`}>
                                    {!msg.isMe && (
                                        <span className={`text-[10px] font-bold ${msg.color}`}>{msg.sender}</span>
                                    )}
                                    <div className={`p-3 rounded-xl shadow-sm text-xs leading-relaxed ${msg.isMe ? 'bg-lamaSkyLight rounded-tr-none text-slate-700' : 'bg-white rounded-tl-none text-slate-600'}`}>
                                        {msg.text}
                                    </div>
                                    <span className="text-[9px] text-gray-400">{msg.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-2 py-2 border border-gray-200">
                            <div className="p-2 rounded-full bg-gray-100 text-gray-400 cursor-pointer hover:bg-gray-200">
                                <Paperclip size={18} />
                            </div>
                            <input type="text" placeholder="Type your message" className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder-gray-400 px-2" />
                            <div className="flex gap-1">
                                <div className="p-2 rounded-full text-gray-400 cursor-pointer hover:bg-gray-200">
                                    <ImageIcon size={18} />
                                </div>
                                <div className="p-2 rounded-full text-gray-400 cursor-pointer hover:bg-gray-200">
                                    <Mic size={18} />
                                </div>
                                <div className="p-2 rounded-full bg-lamaSky text-sky-600 cursor-pointer hover:bg-sky-200">
                                    <Send size={18} className="ml-0.5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-6 text-xs text-gray-400 pt-2 mt-2">
                <div className="flex items-center gap-2">
                    <Mail size={14} />
                    <span>emailaddress@mail.com</span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone size={14} />
                    <span>+82 1234 5678</span>
                </div>
                <div className="ml-auto flex gap-4">
                    <span>Terms of Use</span>
                    <span>Privacy Policy</span>
                    <span>Copyright © Peterdraw</span>
                </div>
            </div>
        </div>
    );
};

const NoticePage = () => {
    return (
        <div className="p-6 h-full flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-slate-800">School Notices</h1>
                <div className="flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-200 px-4 py-2 bg-white w-[250px]">
                    <Search size={16} className="text-gray-400" />
                    <input type="text" placeholder="Search notices..." className="w-full bg-transparent outline-none text-gray-600 placeholder-gray-400" />
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm flex-1 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col gap-6">
                    {noticesList.map((notice) => (
                        <div key={notice.id} className={`p-6 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow ${notice.selected ? 'bg-lamaPurpleLight/20' : 'bg-white'}`}>
                            {/* Image */}
                            <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden shrink-0">
                                <img src={notice.img} alt={notice.title} className="w-full h-full object-cover" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex flex-col gap-1">
                                        <h2 className="text-lg font-bold text-slate-800">{notice.title}</h2>
                                        <div className="flex items-center gap-4 text-xs text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <UserCircle size={14} />
                                                <span>{notice.author}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <CalendarDays size={14} />
                                                <span>{notice.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Eye size={14} />
                                                <span>{notice.views}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {notice.tags?.map(tag => (
                                            <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-500 font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                                    {notice.desc}
                                </p>

                                <div className="mt-auto flex items-center justify-between">
                                    <button className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                                        Read More <ChevronRight size={14} />
                                    </button>

                                    <div className="flex gap-2">
                                        <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-400 hover:text-slate-600 transition-colors">
                                            <Paperclip size={16} />
                                        </button>
                                        <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-400 hover:text-slate-600 transition-colors">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer info */}
                <div className="mt-8 flex gap-6 text-xs text-gray-400 border-t border-gray-100 pt-6 justify-center md:justify-start">
                    <div className="flex items-center gap-2">
                        <Mail size={14} />
                        <span>emailaddress@mail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone size={14} />
                        <span>+82 1234 5678</span>
                    </div>
                    <div className="ml-auto flex gap-4 hidden md:flex">
                        <span>Terms of Use</span>
                        <span>Privacy Policy</span>
                        <span>Copyright © Peterdraw</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Layout Components ---

const Navbar = () => {
    return (
        <div className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-200 px-4 py-2 bg-white">
                <Search size={16} className="text-gray-400" />
                <input type="text" placeholder="Search" className="w-[200px] bg-transparent outline-none text-gray-600 placeholder-gray-400" />
            </div>

            {/* Icons & User */}
            <div className="flex items-center gap-6 justify-end w-full md:w-auto">
                <div className="bg-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer relative shadow-sm hover:bg-gray-50 border border-gray-100">
                    <MessageSquare size={18} className="text-gray-500" />
                </div>
                <div className="bg-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer relative shadow-sm hover:bg-gray-50 border border-gray-100">
                    <Megaphone size={18} className="text-gray-500" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-purple-500 text-white rounded-full text-[10px] border-2 border-white">1</div>
                </div>
                <div className="flex flex-col text-right">
                    <span className="text-sm leading-4 font-semibold text-slate-700">Sophia Wilson</span>
                    <span className="text-[10px] text-gray-400 text-right">Admin</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center border border-gray-100 shadow-sm">
                    <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Avatar" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
};

const Sidebar = ({ activePage, onNavigate }: { activePage: string, onNavigate: (page: string) => void }) => {
    const menuItems = [
        {
            title: "MENU",
            items: [
                { icon: <LayoutDashboard size={18} />, label: "Dashboard", id: 'dashboard' },
                { icon: <GraduationCap size={18} />, label: "Teachers", id: 'teachers' },
                { icon: <Users size={18} />, label: "Students", id: 'students' },
                { icon: <Users size={18} />, label: "Attendance", id: 'attendance' },
                {
                    icon: <CircleDollarSign size={18} />,
                    label: "Finance",
                    id: 'finance',
                    hasSubmenu: true,
                    submenu: [
                        { label: "Fees Collection", id: 'finance-fees' },
                        { label: "School Expenses", id: 'finance-expenses' }
                    ]
                },
                { icon: <FileText size={18} />, label: "Notice", id: 'notices' },
                { icon: <CalendarDays size={18} />, label: "Calendar", id: 'calendar' },
                { icon: <BookOpen size={18} />, label: "Library", id: 'library' },
                { icon: <MessageCircle size={18} />, label: "Message", id: 'messages' },
                { icon: <ClipboardList size={18} />, label: "Courses", id: 'courses' },
            ],
        },
        {
            title: "OTHER",
            items: [
                { icon: <UserCircle size={18} />, label: "Profile", id: 'profile' },
                { icon: <Settings size={18} />, label: "Setting", id: 'settings' },
                { icon: <LogOut size={18} />, label: "Log out", id: 'logout' },
            ],
        },
    ];

    const handleItemClick = (id: string) => {
        // Determine the page to navigate to. 
        if (id === 'dashboard' || id === 'finance' || id === 'attendance' || id === 'notices' || id === 'calendar' || id === 'messages' || id === 'finance-fees' || id === 'finance-expenses' || id === 'library' || id === 'students' || id === 'teachers' || id === 'courses') {
            onNavigate(id);
        }
    };

    return (
        <div className="text-sm h-screen overflow-y-auto flex flex-col custom-scrollbar">
            <div className="flex items-center gap-3 px-6 py-6">
                <div className="bg-sky-400 rounded-lg p-1.5 flex items-center justify-center shadow-sm">
                    <Hexagon size={20} className="text-white fill-white" />
                </div>
                <span className="hidden lg:block font-bold text-lg text-slate-800 tracking-tight">SchoolHub</span>
            </div>

            <div className="flex-1 flex flex-col gap-6 px-4">
                {menuItems.map((i) => (
                    <div className="flex flex-col gap-1" key={i.title}>
                        <span className="hidden lg:block text-gray-400 font-medium mb-2 uppercase px-2 text-[10px] tracking-wider">
                            {i.title}
                        </span>
                        {i.items.map((item) => {
                            // If this is finance, it's active if any finance subpage is active
                            const isActive = item.id === 'finance'
                                ? activePage.startsWith('finance')
                                : activePage === item.id;

                            return (
                                <div key={item.label} className="flex flex-col">
                                    <button
                                        onClick={() => handleItemClick(item.id)}
                                        className={`flex items-center justify-center lg:justify-start gap-3 py-2.5 px-3 rounded-lg transition-all duration-200 w-full text-left ${isActive
                                            ? "bg-sky-100 text-sky-600 font-medium"
                                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                            }`}
                                    >
                                        {item.icon}
                                        <span className="hidden lg:block flex-1 text-sm">{item.label}</span>
                                        {item.hasSubmenu && <ChevronRight size={16} className={`hidden lg:block transition-transform ${isActive ? 'rotate-90 text-sky-600' : 'text-gray-400'}`} />}
                                    </button>

                                    {/* Submenu */}
                                    {item.submenu && isActive && (
                                        <div className="ml-9 mt-1 flex flex-col gap-1 border-l-2 border-gray-100 pl-3">
                                            {item.submenu.map(sub => (
                                                <button
                                                    key={sub.label}
                                                    onClick={(e) => { e.stopPropagation(); onNavigate(sub.id); }}
                                                    className={`text-left text-xs py-1.5 px-2 rounded-md block w-full transition-colors ${activePage === sub.id ? 'text-slate-800 font-bold bg-gray-50' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                                                >
                                                    {sub.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

const FinancePage = () => {
    return (
        <div className="p-6 flex flex-col gap-6 h-full">
            <FeesChart />
            <FeesTable />
        </div>
    );
};

const AttendancePage = () => {
    const days = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

    return (
        <div className="p-6 flex flex-col gap-6 h-full">
            <div className="bg-white rounded-3xl p-6 shadow-sm flex-1 flex flex-col">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h2 className="text-xl font-bold text-slate-800">Attendance</h2>
                    <div className="flex flex-wrap gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-xs font-semibold text-gray-500 hover:bg-gray-100">
                            <CalendarDays size={14} />
                            <span>April 2024</span>
                            <ChevronRight size={14} className="rotate-90" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-xs font-semibold text-gray-500 hover:bg-gray-100">
                            <span>Week 2-3</span>
                            <ChevronRight size={14} className="rotate-90" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-xs font-semibold text-gray-500 hover:bg-gray-100">
                            <span>Class 11A</span>
                            <ChevronRight size={14} className="rotate-90" />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-gray-500 text-xs font-semibold border-b border-gray-100 bg-lamaSkyLight">
                                <th className="p-4 min-w-[150px] rounded-tl-xl rounded-bl-xl">Student Name</th>
                                {days.map((d, index) => (
                                    <th key={d} className={`p-4 text-center min-w-[40px] ${index === days.length - 1 ? 'rounded-tr-xl rounded-br-xl' : ''}`}>{String(d).padStart(2, '0')}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceTableData.map(student => (
                                <tr key={student.id} className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none group">
                                    <td className="p-4 text-sm font-semibold text-slate-700">{student.name}</td>
                                    {days.map(d => {
                                        const status = student.attendance[d as keyof typeof student.attendance];
                                        return (
                                            <td key={d} className="p-4 text-center">
                                                <div className="flex items-center justify-center h-full">
                                                    {status === true && (
                                                        <div className="w-6 h-6 rounded-full bg-sky-400 flex items-center justify-center text-white shadow-sm">
                                                            <Check size={12} strokeWidth={3} />
                                                        </div>
                                                    )}
                                                    {status === false && (
                                                        <div className="w-6 h-6 rounded-full bg-red-400 flex items-center justify-center text-white shadow-sm">
                                                            <X size={12} strokeWidth={3} />
                                                        </div>
                                                    )}
                                                    {status === null && (
                                                        <span className="text-gray-300">-</span>
                                                    )}
                                                </div>
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-6 border-t border-gray-100 gap-4">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-gray-50">
                        Previous
                    </button>

                    <div className="flex gap-2 text-xs font-medium text-gray-500">
                        <span className="w-6 h-6 flex items-center justify-center bg-sky-400 text-white rounded-full">1</span>
                        <span className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer">2</span>
                        <span className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer">3</span>
                        <span className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer">4</span>
                        <span className="flex items-center justify-center">...</span>
                        <span className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer">17</span>
                    </div>

                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-gray-50">
                        Next
                    </button>
                </div>

                <div className="mt-8 flex gap-6 text-xs text-gray-400 pt-2">
                    <div className="flex items-center gap-2">
                        <Mail size={14} />
                        <span>emailaddress@mail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone size={14} />
                        <span>+82 1234 5678</span>
                    </div>
                    <div className="ml-auto flex gap-4">
                        <span>Terms of Use</span>
                        <span>Privacy Policy</span>
                        <span>Copyright © Peterdraw</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DashboardPage = () => {
    return (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
            {/* LEFT SIDE: Charts & Stats */}
            <div className="w-full lg:w-2/3 flex flex-col gap-4">
                {/* Stats Cards */}
                <div className="flex gap-4 justify-between flex-wrap">
                    <UserCard type="student" count="6,123" date="2024/25" bg="bg-lamaPurpleLight" />
                    <UserCard type="teacher" count="1,234" date="2024/25" bg="bg-lamaYellowLight" />
                    <UserCard type="parent" count="5,231" date="2024/25" bg="bg-lamaPurpleLight" />
                    <UserCard type="staff" count="1,032" date="2024/25" bg="bg-lamaYellowLight" />
                </div>

                {/* Middle Section: Count & Attendance */}
                <div className="flex gap-4 flex-col lg:flex-row">
                    {/* Count Chart */}
                    <div className="w-full lg:w-1/3 h-[450px]">
                        <CountChart />
                    </div>
                    {/* Attendance Chart */}
                    <div className="w-full lg:w-2/3 h-[450px]">
                        <AttendanceChart />
                    </div>
                </div>

                {/* Earnings Chart */}
                <div className="w-full h-[500px]">
                    <EarningsChart />
                </div>

                {/* Bottom Section: Widgets Side-by-Side */}
                <div className="flex gap-4 flex-col lg:flex-row h-full">
                    <div className="w-full lg:w-1/2">
                        <StudentActivity />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <NoticeBoard />
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Calendar & Announcements & Messages */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
                <EventCalendar />
                <Announcements />
                <Messages />
            </div>
        </div>
    );
}

const CoursesPage = () => {
    const [courses, setCourses] = useState<Course[]>(coursesData);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newCourse, setNewCourse] = useState({
        name: '', code: '', teacher: '', class: '', schedule: '', duration: '', students: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddCourse = async () => {
        if (!newCourse.name || !newCourse.code) return;
        setIsSubmitting(true);

        const course: Course = {
            id: Date.now(),
            name: newCourse.name,
            code: newCourse.code,
            teacher: newCourse.teacher,
            class: newCourse.class,
            schedule: newCourse.schedule,
            duration: newCourse.duration,
            students: parseInt(newCourse.students) || 0,
            status: 'Active',
            img: `https://ui-avatars.com/api/?name=${encodeURIComponent(newCourse.code)}&background=CFCEFF&color=1e293b&bold=true&size=128`,
        };

        try {
            const { supabase } = await import('./supabaseClient');
            const { error } = await supabase.from('courses').insert([{
                name: course.name,
                code: course.code,
                teacher: course.teacher,
                class: course.class,
                schedule: course.schedule,
                duration: course.duration,
                students: course.students,
                status: course.status,
                img: course.img,
            }]);
            if (error) console.warn('Supabase insert failed (table may not exist yet):', error.message);
        } catch (e) {
            console.warn('Supabase not available, saving locally only.');
        }

        setCourses(prev => [course, ...prev]);
        setNewCourse({ name: '', code: '', teacher: '', class: '', schedule: '', duration: '', students: '' });
        setShowAddModal(false);
        setIsSubmitting(false);
    };

    const handleDeleteCourse = (id: number) => {
        setCourses(prev => prev.filter(c => c.id !== id));
    };

    return (
        <div className="p-6 h-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-xl font-bold text-slate-800">All Courses</h1>
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-200 px-4 py-2 bg-white w-[250px]">
                        <Search size={16} className="text-gray-400" />
                        <input type="text" placeholder="Search courses..." className="w-full bg-transparent outline-none text-gray-600 placeholder-gray-400" />
                    </div>
                    <button className="w-8 h-8 rounded-full bg-lamaYellow flex items-center justify-center cursor-pointer hover:bg-lamaYellowLight transition-colors">
                        <Sliders size={16} className="text-slate-800 rotate-90" />
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="w-8 h-8 rounded-full bg-lamaYellow flex items-center justify-center cursor-pointer hover:bg-lamaYellowLight transition-colors"
                    >
                        <Plus size={16} className="text-slate-800" />
                    </button>
                </div>
            </div>

            {/* Add Course Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
                    <div
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                        style={{ animation: 'modalSlideIn 0.3s ease-out' }}
                    >
                        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Add New Course</h2>
                                <p className="text-xs text-gray-400 mt-0.5">Fill in the course details below</p>
                            </div>
                            <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6 flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Course Name <span className="text-red-400">*</span></label>
                                    <input type="text" placeholder="e.g. Advanced Mathematics" value={newCourse.name} onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Course Code <span className="text-red-400">*</span></label>
                                    <input type="text" placeholder="e.g. MATH-301" value={newCourse.code} onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Teacher</label>
                                    <input type="text" placeholder="e.g. Dean Guerrero" value={newCourse.teacher} onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Class</label>
                                    <input type="text" placeholder="e.g. 12A" value={newCourse.class} onChange={(e) => setNewCourse({ ...newCourse, class: e.target.value })} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Schedule</label>
                                    <input type="text" placeholder="e.g. Mon, Wed, Fri" value={newCourse.schedule} onChange={(e) => setNewCourse({ ...newCourse, schedule: e.target.value })} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Duration</label>
                                    <input type="text" placeholder="e.g. 1 hour" value={newCourse.duration} onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Max Students</label>
                                    <input type="number" placeholder="e.g. 30" value={newCourse.students} onChange={(e) => setNewCourse({ ...newCourse, students: e.target.value })} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-gray-100">
                            <button onClick={() => setShowAddModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-gray-100 transition-colors">Cancel</button>
                            <button
                                onClick={handleAddCourse}
                                disabled={!newCourse.name || !newCourse.code || isSubmitting}
                                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-sky-400 text-white hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Adding...</>
                                ) : (
                                    <><Plus size={16} />Add Course</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-3xl p-6 shadow-sm flex-1 flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-lamaPurpleLight text-slate-700 font-semibold">
                            <tr>
                                <th className="p-4 rounded-tl-xl rounded-bl-xl w-10">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500" />
                                </th>
                                <th className="p-4">Course Name</th>
                                <th className="p-4">Code</th>
                                <th className="p-4">Teacher</th>
                                <th className="p-4">Class</th>
                                <th className="p-4">Schedule</th>
                                <th className="p-4">Duration</th>
                                <th className="p-4">Students</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 rounded-tr-xl rounded-br-xl">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {courses.map((course) => (
                                <tr key={course.id} className={`group hover:bg-gray-50 transition-colors ${course.selected ? 'bg-purple-50/50 hover:bg-purple-50' : ''}`}>
                                    <td className="p-4">
                                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${course.selected ? 'bg-purple-400 border-purple-400' : 'border-gray-300'}`}>
                                            {course.selected && <Check size={12} className="text-white" />}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                                                <img src={course.img} alt={course.name} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-semibold text-slate-800">{course.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-lamaPurpleLight px-2.5 py-1 rounded-lg text-xs font-bold text-purple-600">{course.code}</span>
                                    </td>
                                    <td className="p-4 text-slate-600 font-medium">{course.teacher}</td>
                                    <td className="p-4 font-medium text-slate-800">{course.class}</td>
                                    <td className="p-4 text-slate-600 text-xs">{course.schedule}</td>
                                    <td className="p-4 text-slate-600 text-xs">{course.duration}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1.5">
                                            <Users size={14} className="text-gray-400" />
                                            <span className="font-semibold text-slate-700">{course.students}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${course.status === 'Active' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-gray-50 text-gray-400 border border-gray-200'}`}>
                                            {course.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <button className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-purple-100 text-gray-400 hover:text-purple-600 transition-colors">
                                                <FilePenLine size={14} />
                                            </button>
                                            <button onClick={() => handleDeleteCourse(course.id)} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center items-center mt-auto pt-6 gap-2">
                    <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-gray-50">Previous</button>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-lamaPurple text-purple-600 font-bold text-xs">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-xs">2</button>
                    </div>
                    <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-gray-50">Next</button>
                </div>

                <div className="mt-8 flex gap-6 text-xs text-gray-400 border-t border-gray-100 pt-6 justify-center md:justify-start">
                    <div className="flex items-center gap-2"><Mail size={14} /><span>emailaddress@mail.com</span></div>
                    <div className="flex items-center gap-2"><Phone size={14} /><span>+82 1234 5678</span></div>
                    <div className="ml-auto flex gap-4 hidden md:flex">
                        <span>Terms of Use</span>
                        <span>Privacy Policy</span>
                        <span>Copyright © Peterdraw</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [activePage, setActivePage] = useState('teachers');

    return (
        <div className="flex min-h-screen">
            {/* Sidebar - Fixed width */}
            <div className="w-[16%] md:w-[250px] border-r border-gray-200 bg-white sticky top-0 h-screen hidden md:block shrink-0">
                <Sidebar activePage={activePage} onNavigate={setActivePage} />
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white overflow-y-auto flex flex-col h-screen">
                <Navbar />
                {activePage === 'dashboard' && <DashboardPage />}
                {(activePage === 'finance' || activePage === 'finance-fees') && <FinancePage />}
                {activePage === 'finance-expenses' && <ExpensesPage />}
                {activePage === 'attendance' && <AttendancePage />}
                {activePage === 'notices' && <NoticePage />}
                {activePage === 'calendar' && <CalendarPage />}
                {activePage === 'messages' && <MessagesPage />}
                {activePage === 'library' && <LibraryPage />}
                {activePage === 'students' && <StudentsPage />}
                {activePage === 'teachers' && <TeachersPage />}
                {activePage === 'courses' && <CoursesPage />}
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);