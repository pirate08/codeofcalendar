import Calendar from '@/components/CalendarComponent/Calendar';

export default function Home() {
  return (
    <main className='h-full w-full bg-gradient-to-r from-violet-400 to-fuchsia-300'>
      <div>
        {/* --Importing the calendar section-- */}
        <Calendar />
      </div>
    </main>
  )
}
