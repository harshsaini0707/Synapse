import { useFlashcard } from '@/hooks/fetchFlashcards';
import { useVideoStore } from '@/store/videoStore'
import { useUserStore } from '@/store/userStore'
import React, { useState, useEffect } from 'react'
import { SendToBack, HelpCircle, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

type FlashcardData = {
  id: string;
  video_id: string;
  question: string;
  answer: string;
  hint: string;
}

const Flashcard = () => {
  const { videoId: video_id } = useVideoStore();
  const userName = useUserStore((state) => state.user?.name);
  if (!video_id) console.log("Unable to get videoId");
  const [generate, setGenerate] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const { data, isPending, isError } = useFlashcard(video_id, generate);

  const flashcards: FlashcardData[] = data || [];
  const currentCard = flashcards[currentIndex];

  const rotatingMessages = [
    `${userName?.split(" ")?.[0] || "Learner"}, crafting your flashcards…`,
    `${userName?.split(" ")?.[0] || "Learner"}, extracting key concepts…`,
    `${userName?.split(" ")?.[0] || "Learner"}, creating study materials…`,
    `${userName?.split(" ")?.[0] || "Learner"}, designing perfect cards…`,
    `${userName?.split(" ")?.[0] || "Learner"}, almost ready to study! 📚`,
  ];

  // Rotating messages effect
  useEffect(() => {
    if (isPending && generate) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prevIndex) => 
          (prevIndex + 1) % rotatingMessages.length
        );
      }, 4000); 
      return () => clearInterval(interval);
    }
  }, [isPending, generate, rotatingMessages.length]);

  // Reset message index when loading starts
  useEffect(() => {
    if (isPending && generate) {
      setCurrentMessageIndex(0);
    }
  }, [isPending, generate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!data || data.length === 0) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          handlePrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNext();
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          handleFlip();
          break;
        case 'h':
        case 'H':
          e.preventDefault();
          handleHint();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, flashcards.length, data]);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setShowHint(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowHint(false);
  };

  const handleHint = () => {
    setShowHint(!showHint);
  };

  if (isPending && generate) {
    return (
      <div className="flex flex-col justify-center items-center gap-8 min-h-[60vh] bg-[#09090B]">
        <div className="text-center space-y-3">
          {/* Flipping Text Messages */}
          <div className="h-12 flex items-center justify-center perspective-1000">
            <div 
              key={currentMessageIndex}
              className="text-lg text-emerald-400 font-mono animate-flipIn"
            >
              {rotatingMessages[currentMessageIndex]}
            </div>
          </div>
          
          {/* Progress Animation */}
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-700 ${
                  i === currentMessageIndex % 5 
                    ? 'bg-emerald-400 scale-125 shadow-lg shadow-emerald-400/50' 
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex justify-center px-2 sm:px-4 mt-12'>
        <div className='flex flex-col items-center text-center w-full max-w-md space-y-2 py-4 border border-red-500 rounded-lg bg-red-50 dark:bg-red-900/20'>
          <p className='text-red-600 dark:text-red-400 text-sm poppins-medium'>Error generating flashcards</p>
          <button 
            onClick={() => setGenerate(true)}
            className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    !data ? (
      <div className='flex justify-center px-2 sm:px-4 mt-12'>
        <div className='flex flex-col items-center text-center w-full max-w-md space-y-2 py-4 border border-neutral-700 rounded-lg bg-transparent'>
          <h1 className='font-bold text-md sm:text-lg text-neutral-100'>
            Ready to boost your learning?
          </h1>
          <h2 className='poppins-medium text-sm text-neutral-300'>
            Transform your video content into interactive study materials
          </h2>
          <button 
            onClick={() => setGenerate(true)}
            disabled={isPending && generate}
            className={`flex items-center mt-2 gap-2 px-4 py-2 bg-neutral-200 text-gray-900 shadow rounded-lg transition-all duration-300 transform hover:scale-105 border border-gray-700 font-semibold ${
              (isPending && generate) ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer hover:bg-neutral-300'
            }`}>
            <SendToBack className={`w-4 h-4 font-extrabold ${(isPending && generate) ? 'animate-spin' : ''}`} />
            <span className='text-sm'>{(isPending && generate) ? 'Generating...' : 'Generate FlashCard'}</span>
          </button>
        </div>
      </div>
    ) : (
      <div className='flex flex-col items-center px-4 sm:px-6 mt-3 space-y-4 max-w-3xl mx-auto'>
       
        <div className='flex items-center justify-between w-full max-w-md'>
          <div className='flex items-center gap-4'>
  
            <div></div>
          </div>
          <div className='flex items-center gap-4'>
            <span className='text-muted-foreground poppins-medium text-sm'>
              {currentIndex + 1} of {flashcards.length}
            </span>
          </div>
        </div>

        {/* Flashcard Container - Medium Portrait Shape */}
        <div className="relative w-full max-w-md h-80 [perspective:1000px]">
          <div 
            className={`absolute inset-0 w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
              isFlipped ? '[transform:rotateY(180deg)]' : ''
            }`}
          >
            {/* Front Side - Question */}
            <div 
              className={`absolute inset-0 w-full h-full rounded-xl border p-4 flex flex-col justify-between transition-all duration-300 [backface-visibility:hidden] ${
                showHint 
                  ? 'bg-orange-100/80 dark:bg-orange-900/50 border-orange-300 dark:border-orange-500' 
                  : 'bg-transparent border-border'
              }`}
            >
              <div 
                className='flex-1 flex items-center justify-center cursor-pointer p-2'
                onClick={handleFlip}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleFlip();
                  }
                }}
                aria-label="Click to flip flashcard"
              >
                <h2 className={`text-lg sm:text-xl font-bold text-center poppins-semibold leading-relaxed break-words hyphens-auto ${
                  showHint 
                    ? 'text-orange-900 dark:text-orange-100' 
                    : 'text-neutral-50'
                }`}>
                  {currentCard?.question}
                </h2>
              </div>
              
              {/* Hint Section */}
              {showHint && currentCard?.hint && (
                <div className='mb-3 p-3 bg-orange-200/90 dark:bg-orange-800/70 rounded-lg border border-orange-400 dark:border-orange-600'>
                  <p className='text-orange-800 dark:text-orange-200 text-sm poppins-medium break-words'>
                    💡 {currentCard.hint}
                  </p>
                </div>
              )}

              {/* Bottom Controls */}
              <div className='flex justify-between items-center gap-2'>
                <button
                  onClick={handleHint}
                  className='flex items-center gap-2 px-3 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm'
                  title="Show hint"
                >
                  <HelpCircle className='w-4 h-4' />
                  <span className='sm:inline'>Hint</span>
                </button>
                
                <button
                  onClick={handleFlip}
                  className='flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm'
                  title="Check answer"
                >
                  <Eye className='w-4 h-4' />
                  <span className=' sm:inline poppins-regular'>Answer</span>
                </button>
              </div>
            </div>

            {/* Back Side - Answer */}
            <div 
              className="absolute inset-0 w-full h-full bg-green-50/70 dark:bg-green-900/30 border border-green-300/60 dark:border-green-600/60 rounded-xl p-4 flex items-center justify-center cursor-pointer [backface-visibility:hidden] [transform:rotateY(180deg)]"
              onClick={handleFlip}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleFlip();
                }
              }}
              aria-label="Click to flip back to question"
            >
              <div className='text-center p-2'>
                <h3 className='text-base font-semibold text-green-800 dark:text-green-200 mb-3 poppins-semibold'>
                  Answer:
                </h3>
                <p className='text-lg text-green-900 dark:text-green-100 poppins-regular leading-relaxed break-words hyphens-auto'>
                  {currentCard?.answer}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls - Only Previous and Next */}
        <div className='flex items-center justify-center gap-6 w-full max-w-md'>
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              currentIndex === 0 
                ? 'bg-transparent text-transparent' 
                : 'bg-neutral-100 text-secondary-foreground hover:bg-neutral-300 cursor-pointer'
            }`}
            title="Previous flashcard"
          >
            <ChevronLeft className='w-5 h-5' />
            <span className='sm:inline'>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              currentIndex === flashcards.length - 1 
                ? 'bg-transparent text-transparent' 
                : 'bg-neutral-100 text-secondary-foreground hover:bg-neutral-300'
            }`}
            title="Next flashcard"
          >
            <span className='sm:inline '>Next</span>
            <ChevronRight className='w-5 h-5' />
          </button>
        </div>

        {/* Instructions */}
        <div className='text-center text-sm text-muted-foreground poppins-regular max-w-md space-y-2 px-4'>
          <p className='break-words'>Click on the card to flip it and reveal the answer. Use the hint button for additional help.</p>
          <div className='flex flex-wrap justify-center gap-3 text-xs text-muted-foreground/70'>
            <span>⌨️ Space/Enter to flip</span>
            <span>← → to navigate</span>
            <span>H for hint</span>
          </div>
        </div>
      </div>
    )
  )
}

export default Flashcard