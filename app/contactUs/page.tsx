// components/ContactPage.tsx
'use client';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <section className="bg-black text-white py-24 px-4 md:px-12 min-h-screen">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Contact Info Section */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-red-500">
            Lets Connect
          </h2>
          <p className="text-gray-300 mb-6">
            Have questions? Ready to join? Reach out to us anytime — we are always here for warriors like you.
          </p>

          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold text-white">📞 Call / WhatsApp</h4>
              <p className="text-red-400">+968 9559 3558</p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white">📍 Location</h4>
              <p className="text-gray-400">LUPUS GYM, Oman (Exact address not provided)</p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white">🕒 Timings</h4>
              <ul className="text-gray-300 leading-relaxed">
                <li>Mon–Thu: 5:00 AM – 12:00 MIDNIGHT</li>
                <li>Friday: 2:00 PM – 12:00 MIDNIGHT</li>
                <li>Sat–Sun: 5:00 AM – 12:00 MIDNIGHT</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white">📸 Instagram</h4>
              <a href="https://www.instagram.com/lupusgymoman" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                @lupusgymoman
              </a>
            </div>
          </div>

          <a
            href="https://wa.me/96895593558"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full shadow-lg text-lg transition"
          >
            📲 Message on WhatsApp
          </a>
        </div>

        {/* Visual Side */}
        <div className="relative h-96 md:h-full w-full">
          <Image
            src="/img10.jpg" // replace with real gym image
            alt="Contact LUPUS GYM"
            fill
            className="object-cover rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
