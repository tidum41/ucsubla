'use client';

import Icon from '@/components/common/Icon';

interface Step1Props {
  title: string;
  images: string[];
  imageFiles: File[];
  errors: Record<string, string>;
  onTitleChange: (v: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (i: number) => void;
}

export default function Step1Photos({
  title,
  images,
  imageFiles,
  errors,
  onTitleChange,
  onImageUpload,
  onRemoveImage,
}: Step1Props) {
  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Step heading */}
      <div>
        <h2 className="text-h2 text-darkSlate font-medium">Add photos</h2>
        <p className="text-small text-slateGray mt-0.5">Great photos get more inquiries. Upload up to 8.</p>
      </div>

      {/* Upload zone */}
      {imageFiles.length < 8 && (
        <label className="block">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onImageUpload}
            className="hidden"
          />
          <div className={`bg-white border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${
            errors.images ? 'border-red-400' : 'border-[#CBD5E1] hover:border-uclaBlue'
          }`}>
            <div className="w-10 h-10 bg-uclaBlue/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="plus" size={20} className="text-uclaBlue" />
            </div>
            <p className="text-body text-darkSlate font-medium">
              {imageFiles.length === 0 ? 'Upload Photos' : 'Add More'}
            </p>
            <p className="text-small text-slateGray mt-0.5">
              {imageFiles.length} of 8 uploaded
            </p>
          </div>
        </label>
      )}

      {/* Image grid */}
      {imageFiles.length > 0 && (
        <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto">
          {images.filter(img => img).map((url, index) => (
            <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100">
              <img
                src={url}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => onRemoveImage(index)}
                className="absolute top-1 right-1 bg-black/50 backdrop-blur-sm p-1 rounded-full"
              >
                <Icon name="xmark" size={12} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {errors.images && (
        <p className="text-small text-red-500 -mt-2">{errors.images}</p>
      )}

      {/* Title input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-body text-darkSlate font-medium">
          Listing title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="e.g., Single room near UCLA for Summer 2026"
          maxLength={80}
          className={`w-full bg-white border rounded-xl px-4 py-3 text-body text-darkSlate placeholder:text-lightSlate focus:outline-none focus:ring-2 focus:ring-uclaBlue transition-colors ${
            errors.title ? 'border-red-400' : 'border-[#E2E8F0]'
          }`}
        />
        {errors.title && <p className="text-small text-red-500">{errors.title}</p>}
        <p className="text-small text-slateGray">{title.length}/80</p>
      </div>
    </div>
  );
}
