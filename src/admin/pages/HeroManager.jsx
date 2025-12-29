import { useState } from 'react';
import { Upload, Video, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const HeroManager = () => {
    const [heroData, setHeroData] = useState({
        videoUrl: 'https://cdn.pixabay.com/video/2020/05/25/40088-424930977_large.mp4',
        overlayTitle: 'Welcome to SVI School',
        overlaySubtitle: 'Nurturing Excellence, Shaping Futures',
        ctaText: 'Apply Now',
        ctaLink: '/admissions',
        secondaryCta: 'Learn More',
        secondaryCtaLink: '/about',
    });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHeroData((prev) => ({ ...prev, [name]: value }));
        setSaved(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSaving(false);
        setSaved(true);
    };

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
                                <video
                                    src={heroData.videoUrl}
                                    autoPlay
                                    muted
                                    loop
                                    className="w-full h-full object-cover"
                                />
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
                        </div>

                        {/* Video Upload */}
                        <div className="space-y-2">
                            <Label>Upload New Video</Label>
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-600 mb-2">Drag & drop video file here, or click to browse</p>
                                <p className="text-sm text-gray-400">Recommended: MP4, 1920x1080, max 50MB</p>
                                <Input type="file" accept="video/*" className="hidden" id="video-upload" />
                                <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => document.getElementById('video-upload')?.click()}>
                                    Choose Video
                                </Button>
                            </div>
                        </div>

                        {/* Or Video URL */}
                        <div className="space-y-2">
                            <Label htmlFor="videoUrl">Or Enter Video URL</Label>
                            <Input
                                id="videoUrl"
                                name="videoUrl"
                                value={heroData.videoUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/video.mp4"
                            />
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
                                    'Saving...'
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
                            {saved && (
                                <span className="text-green-600 text-sm flex items-center">✓ Changes saved!</span>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default HeroManager;
