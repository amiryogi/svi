import { useState, useEffect, useRef } from 'react';
import { Upload, Video, Save, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { heroAPI } from '@/api';
import { toast } from 'sonner';

const HeroManager = () => {
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [heroData, setHeroData] = useState({
        videoUrl: '',
        overlayTitle: 'Welcome to SVI School',
        overlaySubtitle: 'Nurturing Excellence, Shaping Futures',
        ctaText: 'Apply Now',
        ctaLink: '/admissions',
        secondaryCta: 'Learn More',
        secondaryCtaLink: '/about',
    });

    // Fetch existing hero data on mount
    useEffect(() => {
        const fetchHero = async () => {
            try {
                const response = await heroAPI.get();
                if (response.data.data) {
                    const hero = response.data.data;
                    setHeroData({
                        videoUrl: hero.video?.url || '',
                        overlayTitle: hero.overlayTitle || 'Welcome to SVI School',
                        overlaySubtitle: hero.overlaySubtitle || 'Nurturing Excellence, Shaping Futures',
                        ctaText: hero.ctaText || 'Apply Now',
                        ctaLink: hero.ctaLink || '/admissions',
                        secondaryCta: hero.secondaryCta || 'Learn More',
                        secondaryCtaLink: hero.secondaryCtaLink || '/about',
                    });
                }
            } catch (error) {
                console.error('Failed to fetch hero:', error);
                toast.error('Failed to load hero data');
            } finally {
                setLoading(false);
            }
        };
        fetchHero();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHeroData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('video/')) {
                toast.error('Please select a video file');
                return;
            }
            // Validate file size (100MB max)
            if (file.size > 100 * 1024 * 1024) {
                toast.error('Video file size must be less than 100MB');
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            toast.info(`Selected: ${file.name}`);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const formData = new FormData();
            formData.append('overlayTitle', heroData.overlayTitle);
            formData.append('overlaySubtitle', heroData.overlaySubtitle);
            formData.append('ctaText', heroData.ctaText);
            formData.append('ctaLink', heroData.ctaLink);
            formData.append('secondaryCta', heroData.secondaryCta);
            formData.append('secondaryCtaLink', heroData.secondaryCtaLink);
            formData.append('active', 'true');

            if (selectedFile) {
                formData.append('video', selectedFile);
            }

            console.log('Uploading hero data...');
            const response = await heroAPI.update(formData);

            if (response.data.success) {
                toast.success('Hero updated successfully!');
                // Update local state with new video URL
                if (response.data.data?.video?.url) {
                    setHeroData(prev => ({
                        ...prev,
                        videoUrl: response.data.data.video.url
                    }));
                    setPreviewUrl(null);
                    setSelectedFile(null);
                }
            }
        } catch (error) {
            console.error('Save failed:', error);
            toast.error(error.response?.data?.message || 'Failed to save hero');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
        );
    }

    const displayVideoUrl = previewUrl || heroData.videoUrl;

    return (
        <div className="space-y-6 max-w-4xl">
            <Card className="border-0 shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-green-600" />
                        Hero Video Settings
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-6">
                        {/* Video Preview */}
                        <div className="space-y-2">
                            <Label>Current Video Preview</Label>
                            <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-900">
                                {displayVideoUrl ? (
                                    <video
                                        src={displayVideoUrl}
                                        autoPlay
                                        muted
                                        loop
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <Video className="w-16 h-16" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <h3 className="text-2xl font-bold mb-2">{heroData.overlayTitle}</h3>
                                        <p className="text-lg opacity-80">{heroData.overlaySubtitle}</p>
                                        <div className="flex gap-3 justify-center mt-4">
                                            <Button size="sm" className="bg-green-600">{heroData.ctaText}</Button>
                                            <Button size="sm" variant="outline" className="text-white border-white">
                                                {heroData.secondaryCta}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {selectedFile && (
                                <p className="text-sm text-green-600">New video selected: {selectedFile.name}</p>
                            )}
                        </div>

                        {/* Video Upload */}
                        <div className="space-y-2">
                            <Label>Upload New Video</Label>
                            <div 
                                className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-green-400 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-600 mb-2">Drag & drop video file here, or click to browse</p>
                                <p className="text-sm text-gray-400">Recommended: MP4, 1920x1080, max 100MB</p>
                                <input 
                                    ref={fileInputRef}
                                    type="file" 
                                    accept="video/*" 
                                    className="hidden" 
                                    onChange={handleFileChange}
                                />
                                <Button type="button" variant="outline" size="sm" className="mt-4">
                                    Choose Video
                                </Button>
                            </div>
                        </div>

                        <hr />

                        {/* Overlay Text */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="overlayTitle">Overlay Title</Label>
                                <Input
                                    id="overlayTitle"
                                    name="overlayTitle"
                                    value={heroData.overlayTitle}
                                    onChange={handleChange}
                                    placeholder="Welcome to Our School"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="overlaySubtitle">Overlay Subtitle</Label>
                                <Input
                                    id="overlaySubtitle"
                                    name="overlaySubtitle"
                                    value={heroData.overlaySubtitle}
                                    onChange={handleChange}
                                    placeholder="Excellence in Education"
                                />
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <h4 className="font-medium">Primary Button</h4>
                                <div className="space-y-2">
                                    <Label htmlFor="ctaText">Button Text</Label>
                                    <Input
                                        id="ctaText"
                                        name="ctaText"
                                        value={heroData.ctaText}
                                        onChange={handleChange}
                                        placeholder="Apply Now"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ctaLink">Button Link</Label>
                                    <Input
                                        id="ctaLink"
                                        name="ctaLink"
                                        value={heroData.ctaLink}
                                        onChange={handleChange}
                                        placeholder="/admissions"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-medium">Secondary Button</h4>
                                <div className="space-y-2">
                                    <Label htmlFor="secondaryCta">Button Text</Label>
                                    <Input
                                        id="secondaryCta"
                                        name="secondaryCta"
                                        value={heroData.secondaryCta}
                                        onChange={handleChange}
                                        placeholder="Learn More"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="secondaryCtaLink">Button Link</Label>
                                    <Input
                                        id="secondaryCtaLink"
                                        name="secondaryCtaLink"
                                        value={heroData.secondaryCtaLink}
                                        onChange={handleChange}
                                        placeholder="/about"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={saving}>
                                {saving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                            <Button type="button" variant="outline" asChild>
                                <a href="/" target="_blank">
                                    <Eye className="w-4 h-4 mr-2" />
                                    Preview on Site
                                </a>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default HeroManager;
