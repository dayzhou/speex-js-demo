// @param bufSpx (Uint8Array) BinaryString holding content of speex file (*.spx or *.ogg)
function decode_ogg(buf) {
    // var buf = atob(JSON.parse(decode_entities(oggBin)).$binary);
    var ogg = new Ogg(buf, {file: true});
    ogg.demux();
    var stream = ogg.bitstream();

    var header = Speex.parseHeader(ogg.frames[0]);
    // var comment = new SpeexComment(ogg.frames[1]);

    var st = new Speex({quality: 8, mode: header.mode, rate: header.rate});
    var pcm = st.decode(stream, ogg.segments);
    var miniSec = Math.round(1000 * pcm.length / header.rate);

    var waveData = PCMData.encode({
        sampleRate: header.rate,
        channelCount: header.nb_channels,
        bytesPerSample: 2,
        data: pcm
    });

    // array buffer holding audio data in wav codec
    var bufWav = Speex.util.str2ab(waveData);
    // convert to a blob object
    var blob = new Blob([bufWav], {type: "audio/wav"});
    // return a "blob://" url which can be used as a href anywhere
    return {
        timeLapse: miniSec,
        url: URL.createObjectURL(blob),
        data: pcm
    };
}