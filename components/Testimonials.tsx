import React from 'react';
import { REVIEWS } from '../constants';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Ils nous font confiance à Narbonne</h2>
          <div className="flex justify-center items-center gap-2">
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6" />
             <span className="font-bold text-slate-600 dark:text-slate-300">4.9/5</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col relative">
              <Quote className="text-brand-200 absolute top-6 right-6" size={40} />
              
              <div className="flex text-accent-500 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 mb-6 italic flex-grow">"{review.text}"</p>
              
              <div className="mt-auto">
                <p className="font-bold text-slate-900 dark:text-white">{review.author}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wide">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;