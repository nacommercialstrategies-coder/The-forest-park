#!/bin/bash
# Final mix. Usage: mix.sh [music|sfx]  (run inside work/audio). Writes mix_<mode>.wav at -14 LUFS (sfx: -16).
MODE=${1:-music}; D=18.0
if [ "$MODE" = music ]; then MUS="[0]volume=0.55,aformat=channel_layouts=stereo[mus];"; MIN="[mus]"; N=8; else MUS="[1]aloop=loop=2:size=384000,atrim=0:${D},volume=0.10,aformat=channel_layouts=stereo[bed];"; MIN="[bed]"; N=8; fi
ffmpeg -v error -y -i score.wav -i roomtone.wav -i heartbeat.wav -i whoosh.wav -i wind.wav -i boom.wav -i cheer_loop.wav -i click.wav -i pov_track.wav -filter_complex "\
${MUS}\
[1]atrim=0:5.2,afade=t=in:d=0.3,afade=t=out:st=4.6:d=0.6,adelay=2200|2200,volume=0.18,aformat=channel_layouts=stereo[rt];\
[2]asplit[h1][h2];[h1]atrim=0:2.4,afade=t=out:st=2.0:d=0.4,volume=0.6,aformat=channel_layouts=stereo[hb1];[h2]atrim=0:3.0,adelay=7300|7300,volume=0.6,aformat=channel_layouts=stereo[hb];\
[3]asplit[w1][w2];[w1]adelay=2050|2050,volume=0.8,aformat=channel_layouts=stereo[wh1];[w2]adelay=7150|7150,volume=0.8,aformat=channel_layouts=stereo[wh];\
[4]asplit[i1][i2];[i1]atrim=0:2.2,afade=t=out:st=1.9:d=0.3,volume=0.35,aformat=channel_layouts=stereo[wi1];[i2]atrim=0:1.4,afade=t=in:d=0.1,afade=t=out:st=1.1:d=0.3,adelay=7300|7300,volume=0.6,aformat=channel_layouts=stereo[wi];\
[5]adelay=10250|10250,volume=0.6,aformat=channel_layouts=stereo[bo];\
[6]afade=t=in:d=0.012,afade=t=out:st=2.6:d=0.25,adelay=10250|10250,volume=0.8,aformat=channel_layouts=stereo[ch];\
[7]adelay=14800|14800,volume=1.4,aformat=channel_layouts=stereo[cl];\
[8]volume=1.0,aformat=channel_layouts=stereo[pov];${MIN}[pov][rt][hb1][hb][wh1][wh][wi1][wi][bo][ch][cl]amix=inputs=$((N+4)):normalize=0,apad,atrim=0:${D},aresample=48000[m]" -map "[m]" mix_raw.wav
T=-14; [ "$MODE" = sfx ] && T=-16
ffmpeg -v error -y -i mix_raw.wav -af "loudnorm=I=${T}:TP=-1.5:LRA=11" -ar 48000 mix_tmp.wav
G=$(ffmpeg -i mix_tmp.wav -af ebur128 -f null - 2>&1 | awk '/I:/{v=$2} END{print v}')
ffmpeg -v error -y -i mix_tmp.wav -af "volume=$(python3 -c "print(${T}-(${G}))")dB,alimiter=limit=0.79:level=false" -ar 48000 mix_${MODE}.wav
ffmpeg -i mix_${MODE}.wav -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2
