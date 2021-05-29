import { useAtom } from 'jotai';
import { useEffect, useRef } from 'preact/hooks';
import { ContextMenu } from '__/components/Desktop/ContextMenu/ContextMenu';
import { StartupChime } from '__/components/Desktop/StartupChime';
import { WindowsArea } from '__/components/Desktop/Window/WindowsArea';
import { Dock } from '__/components/dock/Dock';
import { TopBar } from '__/components/topbar/TopBar';
import { useTimelyWallpapers } from '__/hooks';
import { useWallpaperName } from '__/hooks/use-wallpaper-name';
import css from './Desktop.module.scss';

const DarkBackground = '/assets/wallpapers/3-1.jpg';
const LightBackground = '/assets/wallpapers/3-2.jpg';

export const Desktop = () => {
  const outerRef = useRef<HTMLDivElement>();

  useWallpaperName();
  const [currWallpaperImg, setCurrWallpaperImg] = useTimelyWallpapers();

  useEffect(() => {
    preloadImage(DarkBackground);
    preloadImage(LightBackground);
  }, []);

  return (
    <>
      <main ref={outerRef} class={css.main}>
        <ContextMenu outerRef={outerRef} />
        <TopBar />
        <WindowsArea />
        <Dock />
      </main>

      <StartupChime />

      <div
        class={css.backgroundCover}
        style={{ backgroundImage: `url(/assets/wallpapers/${currWallpaperImg}.jpg)` }}
        aria-hidden="true"
      />
    </>
  );
};

function preloadImage(path: string) {
  const img = new Image();
  img.src = path;
}
