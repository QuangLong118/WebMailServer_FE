'use client';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  fullScreen?: boolean;
}

export default function Loading({
  size = 'md',
  text = 'Loading...',
  variant = 'primary',
  fullScreen = false,
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const variantClasses = {
    default: 'border-gray-300 border-t-gray-600',
    primary: 'border-blue-200 border-t-blue-600',
    success: 'border-green-200 border-t-green-600',
    warning: 'border-yellow-200 border-t-yellow-600',
    error: 'border-red-200 border-t-red-600',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const LoadingSpinner = () => (
    <div className='flex flex-col items-center justify-center space-y-4'>
      {/* Animated spinner */}
      <div className='relative'>
        <div
          className={`${sizeClasses[size]} border-4 rounded-full animate-spin ${variantClasses[variant]}`}
        />
        {/* Inner pulse effect */}
        <div
          className={`absolute inset-0 ${sizeClasses[size]} border-2 rounded-full animate-ping ${variantClasses[variant].replace('border-t-', 'border-')}`}
          style={{ animationDuration: '2s' }}
        />
      </div>

      {/* Loading text */}
      {text && (
        <div className='text-center'>
          <p
            className={`${textSizeClasses[size]} font-medium text-gray-700 animate-pulse`}
          >
            {text}
          </p>
          {/* Dots animation */}
          <div className='flex justify-center mt-2 space-x-1'>
            <div
              className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
              style={{ animationDelay: '0ms' }}
            />
            <div
              className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
              style={{ animationDelay: '150ms' }}
            />
            <div
              className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
              style={{ animationDelay: '300ms' }}
            />
          </div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center'>
        <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-200'>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return <LoadingSpinner />;
}

// Specialized loading components
export const AuthLoading = () => (
  <Loading
    size='lg'
    text='Checking authentication...'
    variant='primary'
    fullScreen
  />
);

export const PageLoading = () => (
  <Loading size='md' text='Loading page...' variant='default' fullScreen />
);

export const DataLoading = () => (
  <Loading size='sm' text='Loading data...' variant='success' />
);
